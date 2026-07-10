from dataclasses import dataclass


@dataclass(frozen=True)
class Recipe:
    """A drink is DATA: price + how much of each ingredient it needs."""
    name: str
    price_cents: int
    needs: dict  # ingredient -> units


MENU = {
    "espresso":   Recipe("Espresso", 200, {"beans": 2, "water": 1}),
    "cappuccino": Recipe("Cappuccino", 320, {"beans": 2, "water": 1, "milk": 2}),
    "latte":      Recipe("Latte", 350, {"beans": 2, "water": 1, "milk": 3}),
}