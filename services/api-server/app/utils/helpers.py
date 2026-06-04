from decimal import Decimal
from datetime import datetime, timedelta
from typing import List, Dict, Any


def calculate_percentage_change(current: float, previous: float) -> float:
    """Calculate percentage change between two values"""
    if previous == 0:
        return 0
    return ((current - previous) / abs(previous)) * 100


def round_to_decimal(value: float, places: int = 2) -> Decimal:
    """Round float to Decimal with specific places"""
    return Decimal(str(round(value, places)))


def get_date_range(days: int) -> tuple:
    """Get start and end date for range"""
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    return start_date, end_date


def aggregate_data(data: List[Dict[str, Any]], group_by: str, sum_field: str) -> Dict[str, float]:
    """Aggregate data by group"""
    result = {}
    for item in data:
        key = item.get(group_by)
        value = item.get(sum_field, 0)
        result[key] = result.get(key, 0) + value
    return result
