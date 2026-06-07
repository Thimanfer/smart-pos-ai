from datetime import datetime, timedelta
import random
from decimal import Decimal
from app.core.database import SessionLocal
from app.models.order import Order

PRODUCTS = [
    ("Coffee", Decimal("3.50")),
    ("Tea", Decimal("2.50")),
    ("Bread", Decimal("2.00")),
    ("Cake", Decimal("4.50")),
]


def seed(days: int = 60, max_per_day: int = 8):
    db = SessionLocal()
    inserted = 0
    try:
        for delta in range(days, 0, -1):
            day = datetime.now() - timedelta(days=delta)
            count = random.randint(1, max_per_day)
            for _ in range(count):
                product, unit_price = random.choice(PRODUCTS)
                qty = random.randint(1, 4)
                total = (unit_price * qty).quantize(Decimal("0.01"))
                order = Order(
                    product_name=product,
                    quantity=qty,
                    unit_price=unit_price,
                    total_amount=total,
                    created_at=day
                )
                db.add(order)
                inserted += 1
        db.commit()
        print(f"Seeded {inserted} orders for last {days} days")
    finally:
        db.close()


if __name__ == "__main__":
    # seed default 60 days
    seed(60, max_per_day=6)
