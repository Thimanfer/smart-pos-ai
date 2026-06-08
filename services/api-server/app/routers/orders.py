from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.schemas import Order, OrderCreate, OrderResponse
from app.services.order_analytics_service import OrderAnalyticsService
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/orders", tags=["orders"])


@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    """Create a new order"""
    try:
        created_order = OrderAnalyticsService.create_order(
            db=db,
            product_name=order.product_name,
            quantity=order.quantity,
            unit_price=order.unit_price,
            total_amount=order.total_amount
        )
        return created_order
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create order"
        )


@router.get("/", response_model=list[OrderResponse])
def get_orders(
    limit: int = 100,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Get all orders with pagination"""
    try:
        orders = OrderAnalyticsService.get_all_orders(db, limit=limit, offset=offset)
        return orders
    except Exception as e:
        logger.error(f"Error fetching orders: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch orders"
        )


@router.get("/recent", response_model=list[OrderResponse])
def get_recent_orders(limit: int = 20, db: Session = Depends(get_db)):
    """Get recent orders for real-time display"""
    try:
        orders = OrderAnalyticsService.get_recent_orders(db, limit=limit)
        return orders
    except Exception as e:
        logger.error(f"Error fetching recent orders: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch recent orders"
        )
