from typing import Optional

from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True,
    )
    
    # API
    API_VERSION: str = "1.0.0"
    API_TITLE: str = "Smart POS AI API"
    API_DESCRIPTION: str = "Enterprise POS System with AI Forecasting"
    
    # Database
    DATABASE_URL: str = "sqlite:///./smart_pos.db"
    ECHO_SQL: bool = False
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Redis
    REDIS_URL: Optional[str] = None
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000"]
    
    # AI/ML
    FORECAST_DAYS: int = 30
    MIN_HISTORICAL_DAYS: int = 30
    

settings = Settings()
