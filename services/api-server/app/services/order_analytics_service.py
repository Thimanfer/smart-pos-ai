from datetime import datetime, timedelta
from decimal import Decimal
import logging

from sqlalchemy import desc, func
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.schemas import DashboardResponse, DashboardStats, DailySales, ProductSales

logger = logging.getLogger(__name__)


class OrderAnalyticsService:
    """Service for order and dashboard analytics."""

    @staticmethod
    def create_order(db: Session, product_name: str, quantity: int, unit_price: Decimal, total_amount: Decimal) -> Order:
        """Create a new order."""
        order = Order(
            product_name=product_name,
            quantity=quantity,
            unit_price=unit_price,
            total_amount=total_amount,
        )
        db.add(order)
        db.commit()
        db.refresh(order)
        logger.info("Order created: %s", order.id)
        return order

    @staticmethod
    def get_all_orders(db: Session, limit: int = 100, offset: int = 0) -> list:
        """Get all orders with pagination."""
        return db.query(Order).order_by(desc(Order.created_at)).offset(offset).limit(limit).all()

    @staticmethod
    def get_orders_by_date(db: Session, date: datetime) -> list:
        """Get orders for a specific date."""
        start_of_day = date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_of_day = start_of_day + timedelta(days=1)

        return db.query(Order).filter(
            Order.created_at >= start_of_day,
            Order.created_at < end_of_day,
        ).all()

    @staticmethod
    def get_dashboard_stats(db: Session) -> DashboardStats:
        """Get dashboard statistics."""
        total_revenue = db.query(func.sum(Order.total_amount)).scalar() or Decimal(0)
        total_orders = db.query(func.count(Order.id)).scalar() or 0
        average_order_value = total_revenue / total_orders if total_orders > 0 else Decimal(0)

        today = datetime.now().date()
        orders_today = db.query(func.count(Order.id)).filter(
            func.date(Order.created_at) == today
        ).scalar() or 0

        return DashboardStats(
            total_revenue=total_revenue,
            total_orders=total_orders,
            average_order_value=average_order_value,
            orders_today=orders_today,
        )

    @staticmethod
    def get_top_products(db: Session, limit: int = 10) -> list[ProductSales]:
        """Get top selling products."""
        total_revenue = db.query(func.sum(Order.total_amount)).scalar() or Decimal(1)

        products = db.query(
            Order.product_name,
            func.sum(Order.quantity).label("quantity"),
            func.sum(Order.total_amount).label("total_sales"),
        ).group_by(Order.product_name).order_by(desc("total_sales")).limit(limit).all()

        return [
            ProductSales(
                product_name=p[0],
                quantity=p[1] or 0,
                total_sales=p[2] or Decimal(0),
                revenue_percentage=float((p[2] or Decimal(0)) / total_revenue * 100),
            )
            for p in products
        ]

    @staticmethod
    def get_daily_sales(db: Session, days: int = 30) -> list[DailySales]:
        """Get daily sales for last N days."""
        start_date = datetime.now() - timedelta(days=days)

        daily_data = db.query(
            func.date(Order.created_at).label("date"),
            func.sum(Order.total_amount).label("total_sales"),
            func.count(Order.id).label("order_count"),
            func.avg(Order.total_amount).label("avg_order_value"),
        ).filter(Order.created_at >= start_date).group_by(
            func.date(Order.created_at)
        ).order_by("date").all()

        return [
            DailySales(
                date=str(d[0]),
                total_sales=d[1] or Decimal(0),
                order_count=d[2] or 0,
                average_order_value=d[3] or Decimal(0),
            )
            for d in daily_data
        ]

    @staticmethod
    def get_recent_orders(db: Session, limit: int = 20) -> list:
        """Get recent orders for real-time display."""
        return db.query(Order).order_by(desc(Order.created_at)).limit(limit).all()

    @staticmethod
    def get_dashboard_data(db: Session, days: int = 30, top_limit: int = 5) -> DashboardResponse:
        """Build the full dashboard response."""
        from app.services.ai_service import AIService

        return DashboardResponse(
            stats=OrderAnalyticsService.get_dashboard_stats(db),
            top_products=OrderAnalyticsService.get_top_products(db, limit=top_limit),
            daily_sales=OrderAnalyticsService.get_daily_sales(db, days=days),
            revenue_forecast=AIService.get_revenue_forecast(db, days=days),
        )


SalesService = OrderAnalyticsService