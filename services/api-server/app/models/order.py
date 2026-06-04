from sqlalchemy import Column, Integer, String, Float, DateTime, Numeric
from sqlalchemy.sql import func
from datetime import datetime
from app.core.database import Base


class Order(Base):
    """Order model for database"""
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(255), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    total_amount = Column(Numeric(12, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    class Config:
        from_attributes = True
