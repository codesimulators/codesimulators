from recipe import Recipe


class Inventory:
    """The resource guard. can_make() gates transitions; consume() commits."""

    def __init__(self, stock: dict):
        self._stock = dict(stock)

    def can_make(self, r: Recipe) -> bool:
        return all(self._stock.get(ing, 0) >= qty for ing, qty in r.needs.items())

    def missing(self, r: Recipe) -> list:
        return [ing for ing, qty in r.needs.items() if self._stock.get(ing, 0) < qty]

    def consume(self, r: Recipe):
        for ing, qty in r.needs.items():
            self._stock[ing] -= qty

    def refill(self, ing: str, qty: int):
        self._stock[ing] = self._stock.get(ing, 0) + qty