# Development Guide

## 📋 Project Setup

### Backend Development

1. **Setup Virtual Environment**
```bash
cd services/api-server
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
```

2. **Install Dependencies**
```bash
pip install -r requirements.txt
```

3. **Environment Configuration**
```bash
cp .env.example .env
# Update .env with your settings
```

4. **Run Server**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

5. **Run POS Simulator** (in another terminal)
```bash
python pos_terminal.py
```

### Frontend Development

1. **Install Dependencies**
```bash
cd apps/dashboard-web
npm install
```

2. **Setup Environment**
```bash
# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local
```

3. **Run Development Server**
```bash
npm run dev
# Open http://localhost:3000
```

## 🔨 Development Commands

### Backend
```bash
# Type checking
python -m mypy app/

# Linting
pylint app/

# Tests
pytest

# Format code
black app/
```

### Frontend
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Run production build
npm start
```

## 📐 Architecture Patterns

### Backend Structure
```
routers/
  ├── orders.py      → CRUD operations
  ├── analytics.py   → Dashboard queries
  └── ai.py          → ML endpoints

services/
  ├── sales_service.py  → Business logic
  └── ai_service.py     → ML models

models/
  ├── order.py          → DB models
  └── schemas.py        → Request/Response schemas
```

### Frontend Structure
```
app/
  ├── page.tsx           → Dashboard
  ├── orders/page.tsx    → Orders page
  ├── layout.tsx         → Root layout
  └── providers.tsx      → Query client

components/
  ├── Charts.tsx         → Chart components
  ├── RealtimeOrders.tsx → Data table
  └── Sidebar.tsx        → Navigation

services/
  └── api.ts             → API integration

hooks/
  └── useApi.ts          → Custom hooks
```

## 🧪 Testing

### Backend Tests
```python
# Example test
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_dashboard():
    response = client.get("/api/v1/dashboard")
    assert response.status_code == 200
    assert "stats" in response.json()
```

### Frontend Tests
```typescript
// Example test
import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/page'

describe('DashboardPage', () => {
  it('renders dashboard', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
  })
})
```

## 📦 Adding Dependencies

### Backend
```bash
cd services/api-server
pip install <package-name>
pip freeze > requirements.txt
```

### Frontend
```bash
cd apps/dashboard-web
npm install <package-name>
# or
npm install -D <package-name> # for dev dependency
```

## 🐛 Debugging

### Backend
1. **Using VS Code Debugger**
   - Install Python extension
   - Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload"],
      "cwd": "${workspaceFolder}/services/api-server"
    }
  ]
}
```

2. **Using Print Debugging**
```python
import logging
logger = logging.getLogger(__name__)
logger.debug("Debug message")
```

### Frontend
1. **Browser DevTools**
   - F12 to open DevTools
   - Console tab for errors
   - Network tab for API calls

2. **Using React Developer Tools**
   - Install React DevTools extension
   - Inspect component state and props

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: describe your change"

# Push to remote
git push origin feature/your-feature

# Create Pull Request
# Follow commit conventions: feat:, fix:, docs:, style:, refactor:, perf:, test:
```

## 📊 Database Migrations

### Using Alembic
```bash
# Initialize (one time)
alembic init migrations

# Create migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## 🚀 Deployment Checklist

- [ ] Update dependencies to latest stable versions
- [ ] Run all tests and ensure they pass
- [ ] Update documentation
- [ ] Set production environment variables
- [ ] Run security checks
- [ ] Build frontend: `npm run build`
- [ ] Build Docker images
- [ ] Test in staging environment
- [ ] Deploy to production

## 📝 Code Standards

### Backend (Python)
- Follow PEP 8
- Use type hints
- Add docstrings to functions
- Use snake_case for variables
- Use UPPER_CASE for constants

### Frontend (TypeScript)
- Use TypeScript for all files
- Follow ESLint rules
- Use camelCase for variables
- Use PascalCase for components
- Export types in separate files

## 🔒 Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Backend and frontend
3. **Use HTTPS in production**
4. **Keep dependencies updated**
5. **Use CORS properly** - Whitelist domains
6. **Implement rate limiting** - Prevent abuse
7. **Use strong secret keys**
8. **Sanitize database queries** - Use ORM

## 📚 Additional Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/)

---

**Tips**: 
- Use `.vscode/settings.json` for workspace-specific editor settings
- Keep commits small and focused
- Write tests as you develop features
- Document complex business logic
