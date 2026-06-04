from sqlalchemy import func
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from decimal import Decimal
from app.models.order import Order
from app.models.schemas import ForecastData
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class AIService:
    """AI and forecasting service"""
    
    @staticmethod
    def get_revenue_forecast(db: Session, days: int = 30) -> list[ForecastData]:
        """
        Forecast revenue for next N days using a lightweight trend model.
        This avoids heavy scientific dependencies so the app can run on
        Windows/Python 3.13 without a compiled numpy stack.
        """
        try:
            historical_days = settings.MIN_HISTORICAL_DAYS
            start_date = datetime.now() - timedelta(days=historical_days)
            
            query = db.query(
                (Order.created_at.cast('date')).label('date'),
                (func.sum(Order.total_amount)).label('revenue')
            ).filter(Order.created_at >= start_date).group_by(
                (Order.created_at.cast('date'))
            ).order_by('date').all()
            
            if not query or len(query) < 5:
                logger.warning("Insufficient historical data for forecasting")
                return []
            
            dates = [q[0] for q in query]
            revenues = [float(q[1] or 0) for q in query]

            # Lightweight linear trend based on first/last historical points.
            first_revenue = revenues[0]
            last_revenue = revenues[-1]
            slope = (last_revenue - first_revenue) / max(len(revenues) - 1, 1)
            avg_revenue = sum(revenues) / len(revenues)
            variance = sum((value - avg_revenue) ** 2 for value in revenues) / len(revenues)
            std_dev = variance ** 0.5

            forecasts = []
            last_day = dates[-1]
            
            for i in range(1, days + 1):
                future_date = last_day + timedelta(days=i)
                predicted_revenue = max(0.0, last_revenue + (slope * i))
                lower_bound = max(0, predicted_revenue - (1.96 * std_dev))
                upper_bound = predicted_revenue + (1.96 * std_dev)
                
                forecasts.append(ForecastData(
                    date=str(future_date),
                    forecasted_revenue=Decimal(str(round(predicted_revenue, 2))),
                    lower_bound=Decimal(str(round(lower_bound, 2))),
                    upper_bound=Decimal(str(round(upper_bound, 2))),
                    confidence=0.95
                ))
            
            return forecasts
        except Exception as e:
            logger.error(f"Error in revenue forecasting: {str(e)}")
            return []
    
    @staticmethod
    def predict_product_demand(db: Session, product_name: str, days: int = 30) -> dict:
        """Predict demand for a specific product"""
        try:
            start_date = datetime.now() - timedelta(days=60)
            
            query = db.query(
                (Order.created_at.cast('date')).label('date'),
                (func.sum(Order.quantity)).label('quantity')
            ).filter(
                Order.product_name == product_name,
                Order.created_at >= start_date
            ).group_by((Order.created_at.cast('date'))).order_by('date').all()
            
            if not query:
                return {"product": product_name, "forecast": []}
            
            dates = [q[0] for q in query]
            quantities = [float(q[1] or 0) for q in query]
            
            if len(quantities) < 3:
                return {"product": product_name, "forecast": []}

            first_quantity = quantities[0]
            last_quantity = quantities[-1]
            slope = (last_quantity - first_quantity) / max(len(quantities) - 1, 1)
            
            forecast = []
            for i in range(days):
                future_date = dates[-1] + timedelta(days=i+1)
                predicted = max(0, int(round(last_quantity + (slope * (i + 1)))))
                forecast.append({
                    "date": str(future_date),
                    "predicted_quantity": predicted
                })
            
            return {
                "product": product_name,
                "forecast": forecast
            }
        except Exception as e:
            logger.error(f"Error predicting demand for {product_name}: {str(e)}")
            return {"product": product_name, "forecast": []}
    
    @staticmethod
    def get_anomalies(db: Session, threshold: float = 2.0) -> list[dict]:
        """Detect anomalies in sales data"""
        try:
            days = 30
            start_date = datetime.now() - timedelta(days=days)
            
            daily_revenue = db.query(
                (Order.created_at.cast('date')).label('date'),
                (func.sum(Order.total_amount)).label('revenue')
            ).filter(Order.created_at >= start_date).group_by(
                (Order.created_at.cast('date'))
            ).all()
            
            if not daily_revenue:
                return []
            
            revenues = [float(r[1] or 0) for r in daily_revenue]
            mean = sum(revenues) / len(revenues)
            variance = sum((value - mean) ** 2 for value in revenues) / len(revenues)
            std = variance ** 0.5
            
            anomalies = []
            for date, revenue in daily_revenue:
                z_score = abs((float(revenue or 0) - mean) / (std + 1e-9))
                if z_score > threshold:
                    anomalies.append({
                        "date": str(date),
                        "revenue": float(revenue or 0),
                        "z_score": z_score,
                        "type": "spike" if revenue > mean else "dip"
                    })
            
            return anomalies
        except Exception as e:
            logger.error(f"Error detecting anomalies: {str(e)}")
            return []
