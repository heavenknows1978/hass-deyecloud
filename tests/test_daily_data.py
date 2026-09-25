"""Regression tests for DeyeCloud daily-bucket handling."""

from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
import unittest


MODULE_PATH = (
    Path(__file__).parents[1]
    / "custom_components"
    / "deyecloud"
    / "data.py"
)
SPEC = spec_from_file_location("deyecloud_data", MODULE_PATH)
DATA = module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(DATA)


class DailyBucketTests(unittest.TestCase):
    """Cover the stale-bucket sequence captured in issue #14."""

    def setUp(self):
        self.yesterday = {
            "generationValue": 12.2,
            "consumptionValue": 17.3,
            "gridValue": 0,
            "purchaseValue": 5.1,
            "chargeValue": 0,
            "dischargeValue": 0,
        }
        self.placeholder = DATA.empty_daily_record("2026-07-05")

    def test_rejects_yesterday_bucket_after_old_two_hour_window(self):
        """A placeholder keeps the guard active until real data is published."""
        self.assertTrue(
            DATA.should_reject_stale_today(
                dict(self.yesterday),
                self.yesterday,
                self.placeholder,
                in_midnight_guard=False,
            )
        )

    def test_rejects_slightly_drifted_stale_snapshot(self):
        stale = dict(self.yesterday)
        stale["generationValue"] = 12.1
        stale["consumptionValue"] = 17.1
        self.assertTrue(
            DATA.should_reject_stale_today(
                stale,
                self.yesterday,
                self.placeholder,
                in_midnight_guard=False,
            )
        )

    def test_accepts_genuine_current_day_bucket(self):
        current = {
            "generationValue": 0,
            "consumptionValue": 5.4,
            "gridValue": 0,
            "purchaseValue": 5.4,
            "chargeValue": 0,
            "dischargeValue": 0,
        }
        self.assertFalse(
            DATA.should_reject_stale_today(
                current,
                self.yesterday,
                self.placeholder,
                in_midnight_guard=False,
            )
        )

    def test_stops_extended_guard_after_real_bucket_is_accepted(self):
        accepted_today = {
            "date": "2026-07-05",
            "generationValue": 1.0,
            "consumptionValue": 2.0,
        }
        self.assertFalse(
            DATA.should_reject_stale_today(
                dict(self.yesterday),
                self.yesterday,
                accepted_today,
                in_midnight_guard=False,
            )
        )

    def test_solar_only_station_needs_one_matching_nonzero_counter(self):
        yesterday = {"generationValue": 8.5}
        self.assertTrue(
            DATA.should_reject_stale_today(
                {"generationValue": 8.5},
                yesterday,
                self.placeholder,
                in_midnight_guard=False,
            )
        )


class DeviceBatchTests(unittest.TestCase):
    """The official /device/latest endpoint accepts at most ten serials."""

    def test_splits_more_than_ten_devices_without_losing_order(self):
        serials = [str(index) for index in range(25)]
        batches = DATA.batched_device_serials(serials)
        self.assertEqual([10, 10, 5], [len(batch) for batch in batches])
        self.assertEqual(serials, [serial for batch in batches for serial in batch])


class MeasurePointTests(unittest.TestCase):
    """/device/measurePoints can repeat keys, which duplicated unique IDs."""

    def test_unique_keys_drops_duplicates_and_blanks(self):
        keys = ["GeneratorFrequency", "GenVoltage", "", None, "GeneratorFrequency", "GenVoltage", "PV4"]
        self.assertEqual(
            ["GeneratorFrequency", "GenVoltage", "PV4"],
            DATA.unique_keys(keys),
        )


class MonthEndTodayTests(unittest.TestCase):
    """Issue #25: Today is derived from the monthly bucket on the last day."""

    def setUp(self):
        # Values captured from DeyeCloud for September 2026 (station 61052153).
        self.month = {
            "year": 2026,
            "month": 9,
            "generationValue": 519.7,
            "consumptionValue": 904.7,
            "gridValue": 13.2,
            "purchaseValue": 421.4,
            "chargeValue": 251.4,
            "dischargeValue": 228.2,
        }
        self.previous_days = [
            {"generationValue": 300.0, "consumptionValue": 500.0, "gridValue": 10.0,
             "purchaseValue": 200.0, "chargeValue": 150.0, "dischargeValue": 120.0},
            {"generationValue": 203.9, "consumptionValue": 388.9, "gridValue": 2.7,
             "purchaseValue": 213.3, "chargeValue": 92.7, "dischargeValue": 107.0},
        ]

    def test_subtracts_closed_days_from_month_total(self):
        record = DATA.derive_today_from_month("2026-09-30", self.month, self.previous_days, None)
        self.assertEqual("2026-09-30", record["date"])
        self.assertTrue(record["_deyecloud_derived"])
        self.assertAlmostEqual(15.8, record["generationValue"])
        self.assertAlmostEqual(15.8, record["consumptionValue"])
        self.assertAlmostEqual(0.5, record["gridValue"])
        self.assertAlmostEqual(8.1, record["purchaseValue"])
        self.assertAlmostEqual(8.7, record["chargeValue"])
        self.assertAlmostEqual(1.2, record["dischargeValue"])

    def test_never_negative(self):
        month = dict(self.month, gridValue=12.6)
        record = DATA.derive_today_from_month("2026-09-30", month, self.previous_days, None)
        self.assertEqual(0.0, record["gridValue"])

    def test_rounding_wobble_does_not_decrease_today(self):
        cached = {"date": "2026-09-30", "generationValue": 15.9}
        record = DATA.derive_today_from_month("2026-09-30", self.month, self.previous_days, cached)
        self.assertAlmostEqual(15.9, record["generationValue"])

    def test_ignores_cached_value_from_another_day(self):
        cached = {"date": "2026-09-29", "generationValue": 25.0}
        record = DATA.derive_today_from_month("2026-09-30", self.month, self.previous_days, cached)
        self.assertAlmostEqual(15.8, record["generationValue"])

    def test_placeholder_does_not_block_real_value(self):
        placeholder = DATA.empty_daily_record("2026-09-30")
        record = DATA.derive_today_from_month("2026-09-30", self.month, self.previous_days, placeholder)
        self.assertAlmostEqual(15.8, record["generationValue"])

    def test_missing_month_record_returns_none(self):
        self.assertIsNone(DATA.derive_today_from_month("2026-09-30", None, self.previous_days, None))

    def test_missing_metric_stays_unknown(self):
        month = dict(self.month)
        del month["chargeValue"]
        record = DATA.derive_today_from_month("2026-09-30", month, self.previous_days, None)
        self.assertIsNone(record["chargeValue"])


class OptimizerProductionTests(unittest.TestCase):
    """Per-panel optimizer production from /device/history (issue #28)."""

    DATA_LIST = [
        {"time": "2026-09-23", "itemList": [{"unit": "kWh", "value": "2.55", "key": "Production"}]},
        {"time": "2026-09-24", "itemList": [{"unit": "kWh", "value": "2.64", "key": "Production"}]},
    ]

    def test_today_and_month(self):
        record = DATA.optimizer_production(self.DATA_LIST, "2026-09-24")
        self.assertEqual(record, {"date": "2026-09-24", "today": 2.64, "month": 5.19})

    def test_missing_today_bucket_is_zero(self):
        record = DATA.optimizer_production(self.DATA_LIST[:1], "2026-09-24")
        self.assertEqual(record["today"], 0.0)
        self.assertEqual(record["month"], 2.55)

    def test_never_decreases_within_day(self):
        previous = {"date": "2026-09-24", "today": 2.7, "month": 5.3}
        record = DATA.optimizer_production(self.DATA_LIST, "2026-09-24", previous)
        self.assertEqual(record["today"], 2.7)
        self.assertEqual(record["month"], 5.3)

    def test_resets_on_new_month(self):
        previous = {"date": "2026-09-30", "today": 2.7, "month": 60.0}
        record = DATA.optimizer_production([], "2026-10-01", previous)
        self.assertEqual((record["today"], record["month"]), (0.0, 0.0))


if __name__ == "__main__":
    unittest.main()
