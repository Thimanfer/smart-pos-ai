<<<<<<< HEAD
# Smart POS AI - Enterprise Dashboard

## 📊 Overview

**Smart POS AI** là một hệ thống quản lý POS (Point of Sale) hiện đại với các tính năng AI nâng cao, được xây dựng để phục vụ các tập đoàn lớn. Project bao gồm:

- **Backend**: FastAPI + SQLAlchemy + Machine Learning
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + Recharts
- **Database**: SQLite (có thể nâng cấp sang PostgreSQL)
- **Features**: Dashboard realtime, AI forecasting, Anomaly detection

## ✨ Key Features

### 📈 Dashboard Analytics
- **Chart doanh thu**: Biểu đồ doanh số bán hàng hàng ngày
- **AI dự đoán doanh thu**: Dự báo doanh thu 30-90 ngày sử dụng ML
- **Top selling products**: Top sản phẩm bán chạy nhất
- **Orders realtime**: Theo dõi đơn hàng trực tiếp

### 🤖 AI & ML Features
- Revenue forecasting với Linear Regression
- Product demand prediction
- Anomaly detection trong sales data
- Statistical analysis (Z-score)

### 🔄 Realtime Updates
- Realtime orders tracking
- Auto-refresh dashboard mỗi 1 phút
- WebSocket support (ready for expansion)

## 🏗️ Project Structure

```
smart-pos-ai/
├── apps/
│   └── dashboard-web/                 # Frontend Next.js
│       ├── src/
│       │   ├── app/                   # Next.js App Router
│       │   │   ├── page.tsx           # Dashboard page
│       │   │   ├── orders/            # Orders page
│       │   │   ├── analytics/         # Analytics page
│       │   │   ├── forecast/          # AI Forecast page
│       │   │   ├── layout.tsx         # Root layout
│       │   │   ├── globals.css        # Global styles
│       │   │   └── providers.tsx      # Query client provider
│       │   ├── components/            # Reusable components
│       │   │   ├── StatCard.tsx       # Stat card component
│       │   │   ├── Charts.tsx         # Chart components
│       │   │   ├── RealtimeOrders.tsx # Realtime table
│       │   │   ├── Sidebar.tsx        # Navigation
│       │   │   ├── Header.tsx         # Top header
│       │   │   └── Skeleton.tsx       # Loading skeletons
│       │   ├── hooks/                 # Custom React hooks
│       │   │   └── useApi.ts          # API hooks
│       │   ├── services/              # API services
│       │   │   ├── apiClient.ts       # Axios instance
│       │   │   └── api.ts             # API functions
│       │   ├── types/                 # TypeScript types
│       │   │   └── index.ts           # Type definitions
│       │   └── store/                 # State management (Zustand)
│       ├── package.json
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       └── .env.local
│
├── services/
│   └── api-server/                    # Backend FastAPI
│       ├── app/
│       │   ├── core/                  # Core config
│       │   │   ├── config.py          # Settings
│       │   │   └── database.py        # DB setup
│       │   ├── models/                # Database models
│       │   │   ├── order.py           # Order model
│       │   │   └── schemas.py         # Pydantic schemas
│       │   ├── routers/               # API routes
│       │   │   ├── orders.py          # Orders endpoints
│       │   │   ├── analytics.py       # Analytics endpoints
│       │   │   └── ai.py              # AI endpoints
│       │   ├── services/              # Business logic
│       │   │   ├── sales_service.py   # Sales operations
│       │   │   └── ai_service.py      # AI & ML logic
│       │   └── main.py                # FastAPI app
│       ├── pos_terminal.py            # POS simulator
│       ├── requirements.txt
│       └── data/
│           └── sales.csv              # Sample data
│
├── infra/                             # Infrastructure
│   ├── config/                        # Config files
│   └── docker/                        # Docker setup
│
├── packages/                          # Shared packages
│   ├── types/                         # Shared types
│   ├── ui/                            # Shared UI components
│   └── utils/                         # Shared utilities
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd services/api-server

# Create virtual environment
python -m venv venv
source venv/Scripts/activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: `http://localhost:8000`
- Docs: `http://localhost:8000/docs`

### Frontend Setup

```bash
cd apps/dashboard-web

# Install dependencies
npm install

# Create .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Run development server
npm run dev
```

Dashboard will be available at: `http://localhost:3000`

## 📊 API Endpoints

### Dashboard
- `GET /api/v1/dashboard` - Complete dashboard data
- `GET /api/v1/dashboard/stats` - Dashboard statistics
- `GET /api/v1/dashboard/sales/daily?days=30` - Daily sales
- `GET /api/v1/dashboard/products/top?limit=10` - Top products

### Orders
- `GET /api/v1/orders` - Get all orders
- `GET /api/v1/orders/recent?limit=20` - Get recent orders
- `POST /api/v1/orders` - Create new order

### AI & Forecasting
- `GET /api/v1/ai/forecast/revenue?days=30` - Revenue forecast
- `GET /api/v1/ai/forecast/product/{product_name}` - Product demand prediction
- `GET /api/v1/ai/anomalies?threshold=2.0` - Anomaly detection

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern async Python web framework
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation
- **scikit-learn**: Machine learning
- **pandas**: Data analysis

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS
- **Recharts**: React charting library
- **TanStack Query**: Data fetching & caching
- **Zustand**: State management
- **Axios**: HTTP client

## 🔐 Security Features

- ✅ CORS middleware configured
- ✅ Request/Response validation with Pydantic
- ✅ Error handling & logging
- ✅ Type-safe across backend & frontend
- ✅ Environment variables support

## 📈 Performance Optimization

- **Frontend**: React Query caching, automatic refetching
- **Backend**: Database query optimization, efficient aggregations
- **Rendering**: Component-level code splitting, lazy loading
- **API**: Pagination support for large datasets

## 🚀 Production Deployment

### Backend
```bash
# Using Gunicorn + Uvicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend
```bash
npm run build
npm start
```

### Docker Setup
```bash
# Build containers
docker-compose up -d

# Available at localhost:3000 and localhost:8000
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=sqlite:///./smart_pos.db
SECRET_KEY=your-secret-key
CORS_ORIGINS=["http://localhost:3000"]
FORECAST_DAYS=30
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

## 🐛 Troubleshooting

### CORS Issues
Ensure `CORS_ORIGINS` in backend config includes your frontend URL.

### Data Not Displaying
- Check API is running on port 8000
- Verify database has data (run pos_terminal.py to generate)
- Check browser console for API errors

### Forecast Not Working
- Need at least 30 days of historical data
- Run pos_terminal.py for several minutes to generate data
- Check `FORECAST_DAYS` setting

## 📚 Next Steps

- [ ] Add authentication (JWT)
- [ ] Implement WebSocket for true realtime
- [ ] Add more ML models (Prophet, ARIMA)
- [ ] Database migration to PostgreSQL
- [ ] Add user management
- [ ] Export reports (PDF/Excel)
- [ ] Mobile app support
- [ ] Multi-language support

## 📄 License

MIT License

## 👨‍💼 Author

Smart POS AI Team - Enterprise Dashboard Solution

---

**Last Updated**: May 11, 2026
=======
# Smart POS AI

Smart POS AI is a modern Point of Sale platform that provides real-time order processing, analytics dashboards and a foundation for AI-powered retail intelligence.

## Current Status

The project currently includes:

* Real-time order ingestion
* FastAPI backend services
* Next.js dashboard
* POS simulator for generating sales data
* Analytics and forecasting modules
* Docker-based development environment

## Tech Stack

### Frontend

* Next.js
* TypeScript
* React Query
* TailwindCSS

### Backend

* FastAPI
* Python
* SQLite (development)

### Infrastructure

* Docker
* Docker Compose

## Architecture

POS Simulator → API Server → Realtime Dashboard

## Project Structure

apps/

* dashboard-web

services/

* api-server
* pos-simulator
* ai-engine

packages/

* shared modules

## Development Roadmap

### Short Term

* Inventory management
* Customer management
* WebSocket/SSE realtime updates

### Medium Term

* AI demand forecasting
* Inventory optimization
* Anomaly detection

### Long Term

* AI retail assistant
* Natural language analytics
* Autonomous retail operations

## Vision

To build an AI-powered retail operating system that helps businesses make smarter operational decisions through automation, forecasting and real-time intelligence.
>>>>>>> ae0251023cf199d4bfa0508534d70a74a19e2563
