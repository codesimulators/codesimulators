class Checkout:
    bank = LegacyBank()
    def buy(self, amount_usd):
        # ❌ each caller must remember the quirks by hand:
        cents = round(amount_usd * 100)                 # dollars -> cents
        res = self.bank.make_payment(cents, "USD")
        if res["status"] != 0: raise Exception("declined")  # 0 == success (?!)
        return res["txn"]

class Refunds:
    bank = LegacyBank()
    def refund(self, amount_usd):
        # ❌ ...and the SAME conversion is copy-pasted here:
        cents = round(amount_usd * 100)
        res = self.bank.make_payment(-cents, "USD")
        return res["status"] == 0