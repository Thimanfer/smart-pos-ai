# 🚀 Quick Start Guide

Hướng dẫn nhanh để khởi động Smart POS AI Dashboard.

## ⚡ Bắt đầu nhanh (2 phút)

### 1. Backend Setup

```bash
# Mở terminal tại project root
cd services/api-server

# Tạo virtual environment
python -m venv venv

# Active environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt

# Chạy server
uvicorn app.main:app --reload
```

✅ Backend sẽ chạy tại: http://localhost:8000
- API Docs: http://localhost:8000/docs

### 2. Frontend Setup (Terminal khác)

```bash
cd apps/dashboard-web

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

✅ Dashboard sẽ chạy tại: http://localhost:3000

### 3. Tạo Dữ Liệu (Terminal thứ 3)

```bash
cd services/api-server

# Chạy POS simulator (generate data)
python pos_terminal.py
```

✅ Dữ liệu được sinh ra mỗi 3 giây

## 🎯 Kiểm tra hoạt động

1. Mở browser: http://localhost:3000
2. Bạn sẽ thấy:
   - Dashboard với stats cards
   - Charts hiển thị doanh thu
   - Dự báo AI
   - Bảng đơn hàng realtime

## 📊 API Endpoints

Truy cập http://localhost:8000/docs để xem interactive API docs

### Các endpoint chính:

```
GET  /api/v1/dashboard              # Dashboard hoàn chỉnh
GET  /api/v1/dashboard/stats        # Thống kê
GET  /api/v1/dashboard/sales/daily  # Doanh số hàng ngày
GET  /api/v1/dashboard/products/top # Top sản phẩm
GET  /api/v1/ai/forecast/revenue    # Dự báo doanh thu
GET  /api/v1/orders/recent          # Đơn hàng mới nhất
```

## 🐛 Troubleshooting

### Lỗi: "Connection refused" khi frontend gọi API
- ✅ Kiểm tra backend đang chạy (port 8000)
- ✅ Kiểm tra CORS settings trong backend

### Không thấy data trên dashboard
- ✅ Chạy pos_terminal.py để sinh data
- ✅ Đợi ít nhất 30 giây để accumulate data
- ✅ Refresh page (F5)

### Lỗi "ModuleNotFoundError" khi chạy backend
- ✅ Kiểm tra virtual environment đã được activate
- ✅ Chạy: `pip install -r requirements.txt`

## 📝 Các lệnh hữu ích

```bash
# Backend
cd services/api-server
uvicorn app.main:app --reload              # Dev server
uvicorn app.main:app --host 0.0.0.0        # Production

# Frontend
cd apps/dashboard-web
npm run dev                                 # Dev server
npm run build                              # Production build
npm run format                             # Format code
npm run type-check                         # Type checking

# POS Simulator
python pos_terminal.py                     # Generate test data
```

## 🎓 Tiếp theo

1. Xem [README.md](../README.md) để hiểu chi tiết project
2. Xem [DEVELOPMENT.md](../DEVELOPMENT.md) để tìm hiểu cách phát triển
3. Khám phá các file trong `src/` để hiểu cấu trúc

## 💡 Tips

- Giữ tất cả 3 terminals mở (backend, frontend, simulator)
- Sử dụng VS Code REST Client extension để test API
- Browser DevTools giúp debug frontend issues
- Check Chrome DevTools Network tab khi API call fail

---

**Hãy tạo ra một Dashboard tuyệt vời! 🎉**
