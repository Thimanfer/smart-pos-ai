def test_forecast_endpoint(client):
    r = client.get("/api/v1/ai/forecast/revenue?days=7")
    assert r.status_code == 200
    j = r.json()
    assert "forecast" in j
    assert isinstance(j["forecast"], list)
