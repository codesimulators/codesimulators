class StockTicker:
    def __init__(self):
        self._observers = []

    def subscribe(self, o): self._observers.append(o)
    def unsubscribe(self, o): self._observers.remove(o)

    def set_price(self, p):
        for o in self._observers:
            o.update(p)