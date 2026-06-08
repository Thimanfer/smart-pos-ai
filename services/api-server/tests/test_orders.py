def test_create_and_get_order(client):
    payload = {
        "product_name": "TestItem",
        "quantity": 1,
        "unit_price": "1.00",
        "total_amount": "1.00",
    }
    r = client.post("/api/v1/orders/", json=payload)
    assert r.status_code == 201
    data = r.json()
    assert data["product_name"] == payload["product_name"]

    r2 = client.get("/api/v1/orders/recent?limit=1")
    assert r2.status_code == 200
    recents = r2.json()
    assert isinstance(recents, list)
    assert len(recents) >= 1
