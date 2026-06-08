from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.order_analytics_service import OrderAnalyticsService

router = APIRouter(
    prefix="/sales",
    tags=["sales"]
)

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return OrderAnalyticsService.get_dashboard_data(db)