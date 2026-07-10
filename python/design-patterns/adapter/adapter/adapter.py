class LegacyBankAdapter:   # implements our PaymentGateway shape
    def __init__(self, bank: LegacyBank):
        self.bank = bank

    def pay(self, amount_usd: float):
        cents = round(amount_usd * 100)
        res = self.bank.make_payment(cents, "USD")
        return {"ok": res["status"] == 0, "ref": res["txn"]}