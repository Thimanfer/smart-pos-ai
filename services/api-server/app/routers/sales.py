from fastapi import APIRouter
from app.services.sales_service import get_dashboard_data

router = APIRouter(
    prefix="/sales",
    tags=["sales"]
)

@router.get("/dashboard")
def dashboard():
    return get_dashboard_data()