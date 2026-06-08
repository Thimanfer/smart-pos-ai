from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.ai_service import AIService
import logging
from app.models.schemas import ForecastResponse

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/ai", tags=["ai"])


@router.get("/forecast/revenue", response_model=ForecastResponse)
def get_revenue_forecast(
    days: int = Query(30, ge=1, le=90),
    db: Session = Depends(get_db)
):
    """Get AI revenue forecast for next N days"""
    try:
        forecast = AIService.get_revenue_forecast(db, days=days)
        return {
            "forecast_days": days,
            "forecast": forecast,
            "generated_at": "2026-05-11T00:00:00Z"
        }
    except Exception as e:
        logger.error(f"Error generating revenue forecast: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate revenue forecast"
        )


@router.get("/forecast/product/{product_name}")
def predict_product_demand(
    product_name: str,
    days: int = Query(30, ge=1, le=90),
    db: Session = Depends(get_db)
):
    """Predict demand for a specific product"""
    try:
        forecast = AIService.predict_product_demand(db, product_name, days=days)
        return forecast
    except Exception as e:
        logger.error(f"Error predicting product demand: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to predict product demand"
        )


@router.get("/anomalies")
def detect_anomalies(
    threshold: float = Query(2.0, ge=1.0, le=5.0),
    db: Session = Depends(get_db)
):
    """Detect anomalies in sales data"""
    try:
        anomalies = AIService.get_anomalies(db, threshold=threshold)
        return {
            "anomalies_found": len(anomalies),
            "anomalies": anomalies,
            "threshold": threshold
        }
    except Exception as e:
        logger.error(f"Error detecting anomalies: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to detect anomalies"
        )
