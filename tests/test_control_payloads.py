"""Tests for DeyeCloud remote-control payload validation (#13)."""

from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
import unittest


MODULE_PATH = (
    Path(__file__).parents[1]
    / "custom_components"
    / "deyecloud"
    / "control_payloads.py"
)
SPEC = spec_from_file_location("deyecloud_control_payloads", MODULE_PATH)
CP = module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(CP)


def _slots(**overrides):
    times = ["00:00", "06:00", "10:00", "14:00", "17:00", "22:00"]
    return [dict({"time": t, "power": 3000, "soc": 30}, **overrides) for t in times]


class TimeOfUseTests(unittest.TestCase):

    def test_builds_api_items(self):
        slots = _slots()
        slots[0].update(grid_charge=True, soc=90)
        items = CP.build_tou_items(slots, max_power=5000)
        self.assertEqual(6, len(items))
        self.assertEqual(
            {"time": "00:00", "power": 3000, "soc": 90, "enableGridCharge": True, "enableGeneration": True},
            items[0],
        )
        self.assertFalse(items[1]["enableGridCharge"])

    def test_requires_six_slots(self):
        with self.assertRaises(CP.ControlPayloadError):
            CP.build_tou_items(_slots()[:5], max_power=5000)

    def test_rejects_out_of_range_values(self):
        with self.assertRaises(CP.ControlPayloadError):
            CP.build_tou_items(_slots(soc=101), max_power=5000)
        with self.assertRaises(CP.ControlPayloadError):
            CP.build_tou_items(_slots(power=6000), max_power=5000)

    def test_rejects_bad_or_repeated_times(self):
        slots = _slots()
        slots[1]["time"] = "25:00"
        with self.assertRaises(CP.ControlPayloadError):
            CP.build_tou_items(slots, max_power=5000)
        slots[1]["time"] = "00:00"
        with self.assertRaises(CP.ControlPayloadError):
            CP.build_tou_items(slots, max_power=5000)

    def test_normalizes_time_formats(self):
        self.assertEqual("06:30", CP.normalize_time("6:30"))
        self.assertEqual("06:30", CP.normalize_time("06:30:00"))

    def test_days_default_to_whole_week_in_api_order(self):
        self.assertEqual(list(CP.WEEK_DAYS), CP.normalize_days(None))
        self.assertEqual(["SUNDAY", "FRIDAY"], CP.normalize_days(["friday", "SUNDAY"]))
        with self.assertRaises(CP.ControlPayloadError):
            CP.normalize_days(["FUNDAY"])


class StrategyTests(unittest.TestCase):

    def test_force_charge_enables_grid_charge(self):
        payload = CP.build_strategy_payload("123", "force_charge", target_soc=90, power=4000, max_power=5000)
        self.assertEqual("123", payload["deviceSn"])
        self.assertEqual("on", payload["gridChargeAction"])
        self.assertEqual("on", payload["touAction"])
        self.assertEqual(6, len(payload["timeUseSettingItems"]))
        self.assertTrue(all(i["enableGridCharge"] and i["soc"] == 90 for i in payload["timeUseSettingItems"]))

    def test_self_consumption_does_not_charge_from_grid(self):
        payload = CP.build_strategy_payload("123", "self_consumption", target_soc=20, power=4000, max_power=5000)
        self.assertNotIn("gridChargeAction", payload)
        self.assertFalse(any(i["enableGridCharge"] for i in payload["timeUseSettingItems"]))
        self.assertEqual("ZERO_EXPORT_TO_CT", payload["workMode"])

    def test_feed_in_raises_export_limits(self):
        payload = CP.build_strategy_payload("123", "feed_in", target_soc=15, power=5000, max_power=5000)
        self.assertEqual("SELLING_FIRST", payload["workMode"])
        self.assertEqual(5000, payload["maxSellPower"])

    def test_rejects_unknown_strategy_and_work_mode(self):
        with self.assertRaises(CP.ControlPayloadError):
            CP.build_strategy_payload("123", "boost", target_soc=50, power=1000, max_power=5000)
        with self.assertRaises(CP.ControlPayloadError):
            CP.build_strategy_payload("123", "hold_soc", target_soc=50, power=1000, max_power=5000, work_mode="TURBO")


# Registers read from a SUN-5K single-phase hybrid (inverter 2306066781).
SINGLE_PHASE_REGISTERS = {
    "00F4": "2", "00F5": "0", "00F7": "0", "00F8": "255", "00E6": "40", "00E8": "0",
    "00D2": "60", "00D3": "40", "0035": "4800", "00CE": "20",
    "00FA": "600", "00FB": "700", "00FC": "1300", "00FD": "1700", "00FE": "2200", "00FF": "0",
    "0100": "1000", "0101": "1500", "0102": "1500", "0103": "2000", "0104": "2000", "0105": "1000",
    "010C": "100", "010D": "95", "010E": "90", "010F": "40", "0110": "30", "0111": "20",
}


class DecodeSettingsTests(unittest.TestCase):

    def test_decodes_single_phase_registers(self):
        settings = CP.decode_settings(SINGLE_PHASE_REGISTERS)
        self.assertEqual("ZERO_EXPORT_TO_CT", settings["work_mode"])
        self.assertFalse(settings["solar_sell"])
        self.assertFalse(settings["grid_charge"])
        self.assertTrue(settings["time_of_use"])
        self.assertEqual(60, settings["max_charge_current"])
        self.assertEqual(40, settings["max_discharge_current"])
        self.assertEqual(40, settings["grid_charge_current"])
        self.assertEqual(0, settings["max_sell_power"])
        self.assertEqual({"time": "06:00", "power": 1000, "soc": 100}, settings["time_of_use_slots"][0])
        self.assertEqual("00:00", settings["time_of_use_slots"][5]["time"])

    def test_tou_disabled_when_enable_bit_clear(self):
        registers = dict(SINGLE_PHASE_REGISTERS, **{"00F8": "254"})
        self.assertFalse(CP.decode_settings(registers)["time_of_use"])

    def test_unknown_model_decodes_nothing(self):
        self.assertEqual({}, CP.decode_settings({"008E": "2", "0092": "255"}))
        self.assertEqual({}, CP.decode_settings(None))


class ModbusTests(unittest.TestCase):

    def test_builds_read_frame_with_crc(self):
        # Frame sent to inverter 2306066781 for registers 0x00F3..0x00F5.
        self.assertEqual("01 03 00 F3 00 03 F5 F8", CP.build_modbus_read(0x00F3, 3))

    def test_parses_real_response(self):
        self.assertEqual([1, 2, 0], CP.parse_modbus_read("010306000100020000BD75"))

    def test_rejects_bad_crc_or_garbage(self):
        self.assertIsNone(CP.parse_modbus_read("010306000100020000BD76"))
        self.assertIsNone(CP.parse_modbus_read("zz"))
        self.assertIsNone(CP.parse_modbus_read(None))

    def test_decodes_energy_pattern(self):
        self.assertEqual("LOAD_FIRST", CP.decode_energy_pattern([1]))
        self.assertEqual("BATTERY_FIRST", CP.decode_energy_pattern([0]))
        self.assertIsNone(CP.decode_energy_pattern([7]))
        self.assertIsNone(CP.decode_energy_pattern(None))


class OrderStatusTests(unittest.TestCase):

    def test_order_states(self):
        self.assertFalse(CP.order_finished({"status": 0}))
        self.assertFalse(CP.order_finished({"status": 100}))
        self.assertTrue(CP.order_finished({"status": 666}))
        self.assertTrue(CP.order_succeeded({"status": 666}))
        self.assertTrue(CP.order_finished({"status": 500, "error": "540"}))
        self.assertFalse(CP.order_succeeded({"status": 500}))


if __name__ == "__main__":
    unittest.main()
