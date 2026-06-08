# Quick Run Guide

Nếu bạn muốn test đầy đủ hệ thống thật nhanh, hãy mở **3 terminal** và chạy đúng theo thứ tự dưới đây.

## Terminal 1: Backend API

Mở terminal tại thư mục gốc dự án `C:\ABE\smart-pos-ai` và chạy:

```powershell
& .\.venv\Scripts\Activate.ps1
cd services\api-server
pytest -q
uvicorn app.main:app --reload
```

Backend sẽ chạy tại:
- API: `http://127.0.0.1:8000`
- Docs: `http://127.0.0.1:8000/docs`

## Terminal 2: Frontend Dashboard

Mở terminal mới tại thư mục gốc dự án và chạy:

```powershell
cd apps\dashboard-web
npm install
npm run dev
```

Frontend sẽ chạy tại:
- Dashboard: `http://localhost:3000`

Lưu ý: `npm run dev` sẽ giữ terminal chạy liên tục, đây là bình thường.

## Terminal 3: POS Simulator

Mở terminal mới tại thư mục gốc dự án và chạy:

```powershell
& .\.venv\Scripts\Activate.ps1
cd services\api-server
python pos_terminal.py
```

Simulator sẽ tự sinh đơn hàng mới để dashboard cập nhật realtime.

## Nếu muốn AI forecast có dữ liệu tốt hơn

Chạy thêm 1 lần seeder:

```powershell
& .\.venv\Scripts\Activate.ps1
cd services\api-server
python scripts/seed_history.py
```

## Kiểm tra kết quả

Mở các trang sau:

- `http://localhost:3000` để xem dashboard.
- `http://127.0.0.1:8000/docs` để test API.

Bạn nên thấy:
- Stats cards.
- Biểu đồ doanh thu.
- Top products.
- Danh sách orders realtime.
- Revenue forecast từ AI.

## Nếu đang đứng sẵn trong `services/api-server`

Khi terminal đã ở sẵn thư mục `services/api-server` và `.venv` đã active, bạn chỉ cần:

```powershell
pytest -q
uvicorn app.main:app --reload
python pos_terminal.py
```
