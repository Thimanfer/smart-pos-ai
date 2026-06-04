from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.schemas import DashboardResponse, DashboardStats, DailySales
from app.services.sales_service import SalesService
from app.services.ai_service import AIService
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get dashboard statistics"""
    try:
        stats = SalesService.get_dashboard_stats(db)
        return stats
    except Exception as e:
        logger.error(f"Error fetching dashboard stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch dashboard statistics"
        )


@router.get("")
def get_dashboard(db: Session = Depends(get_db)):
    """Get complete dashboard data"""
    try:
        stats = SalesService.get_dashboard_stats(db)
        top_products = SalesService.get_top_products(db, limit=5)
        daily_sales = SalesService.get_daily_sales(db, days=30)
        revenue_forecast = AIService.get_revenue_forecast(db, days=30)
        
        return {
            "stats": stats,
            "top_products": top_products,
            "daily_sales": daily_sales,
            "revenue_forecast": revenue_forecast
        }
    except Exception as e:
        logger.error(f"Error fetching dashboard: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch dashboard data"
        )


@router.get("/sales/daily")
def get_daily_sales(days: int = 30, db: Session = Depends(get_db)):
    """Get daily sales data"""
    try:
        if days < 1 or days > 365:
            raise ValueError("Days must be between 1 and 365")
        
        daily_sales = SalesService.get_daily_sales(db, days=days)
        return {"daily_sales": daily_sales}
    except Exception as e:
        logger.error(f"Error fetching daily sales: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch daily sales data"
        )


@router.get("/products/top")
def get_top_products(limit: int = 10, db: Session = Depends(get_db)):
    """Get top selling products"""
    try:
        if limit < 1 or limit > 100:
            raise ValueError("Limit must be between 1 and 100")
        
        products = SalesService.get_top_products(db, limit=limit)
        return {"top_products": products}
    except Exception as e:
        logger.error(f"Error fetching top products: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch top products"
        )
