class LegacyBank:
    def make_payment(self, cents, currency):
        return {"status": 0, "txn": f"LB-{cents}{currency}"}