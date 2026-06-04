"""POS simulator that posts generated orders to the API.

This keeps the realtime dashboard in sync with the database-backed backend.
"""

from datetime import datetime
import json
import random
import time
from urllib import request, error

products = {
    "Coffee": 3.5,
    "Cake": 4.5,
    "Bread": 2.0,
    "Tea": 2.5
}

API_URL = "http://127.0.0.1:8000/api/v1/orders/"


def generate_order():
    product = random.choice(list(products.keys()))
    price = products[product]
    quantity = random.randint(1, 3)
    total_amount = round(price * quantity, 2)

    return {
        "product_name": product,
        "quantity": quantity,
        "unit_price": price,
        "total_amount": total_amount,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


def send_order(order):
    payload = json.dumps(order).encode("utf-8")
    req = request.Request(
        API_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with request.urlopen(req, timeout=10) as response:
        return response.read().decode("utf-8")


print("POS Terminal started...")

while True:
    order = generate_order()
    try:
        response = send_order(order)
        print("New order posted:", order)
        print("API response:", response)
    except error.URLError as exc:
        print("Failed to post order:", order)
        print("Error:", exc)

    time.sleep(3)