class CardStrategy(PaymentStrategy):
    def charge(self, amount):
        return amount + amount * 0.029 + 0.30

class PaypalStrategy(PaymentStrategy):
    def charge(self, amount):
        return amount + amount * 0.0349 + 0.49

class CryptoStrategy(PaymentStrategy):
    def charge(self, amount):
        return amount + amount * 0.01   # 1% network fee