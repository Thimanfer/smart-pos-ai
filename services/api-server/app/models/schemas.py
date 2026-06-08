from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import List, Optional
from decimal import Decimal


class OrderBase(BaseModel):
    """Base order schema"""
    product_name: str = Field(..., min_length=1, max_length=255)
    quantity: int = Field(..., gt=0)
    unit_price: Decimal = Field(..., gt=0, decimal_places=2)
    total_amount: Decimal = Field(..., gt=0, decimal_places=2)


class OrderCreate(OrderBase):
    """Schema for creating orders"""
    pass


class Order(OrderBase):
    """Order response schema"""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


class DashboardStats(BaseModel):
    """Dashboard statistics"""
    total_revenue: Decimal
    total_orders: int
    average_order_value: Decimal
    orders_today: int


class ProductSales(BaseModel):
    """Product sales information"""
    product_name: str
    quantity: int
    total_sales: Decimal
    revenue_percentage: float


class DailySales(BaseModel):
    """Daily sales data"""
    date: str
    total_sales: Decimal
    order_count: int
    average_order_value: Decimal


class ForecastData(BaseModel):
    """Revenue forecast data"""
    date: str
    forecasted_revenue: Decimal
    lower_bound: Decimal
    upper_bound: Decimal
    confidence: float


class DashboardResponse(BaseModel):
    """Complete dashboard response"""
    stats: DashboardStats
    top_products: List[ProductSales]
    daily_sales: List[DailySales]
    revenue_forecast: List[ForecastData]


class ForecastResponse(BaseModel):
    """Standardized forecast response for AI endpoints"""
    forecast_days: int
    forecast: List[ForecastData]
    generated_at: Optional[str] = None


class OrderResponse(BaseModel):
    """Real-time order response"""
    id: int
    product_name: str
    quantity: int
    unit_price: Decimal
    total_amount: Decimal
    created_at: datetime
