def test_dashboard_structure(client):
    r = client.get("/api/v1/dashboard")
    assert r.status_code == 200
    data = r.json()
    assert "stats" in data
    assert "daily_sales" in data
    assert "revenue_forecast" in data
