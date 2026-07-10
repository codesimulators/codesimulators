from wallet_manager import WalletManager

bank = WalletManager()
bank.open("A", "alice")
bank.open("B", "bob")

bank.add_money("A", 5000, "k-topup-1")   # A: $50.00
bank.add_money("B", 5000, "k-topup-2")   # B: $50.00

bank.transfer("A", "B", 2000, "k-transfer-1")
print(bank.get_balance("A"), bank.get_balance("B"))   # 3000 7000

bank.transfer("A", "B", 2000, "k-transfer-1")   # retried — SAME key
print(bank.get_balance("A"), bank.get_balance("B"))   # still 3000 7000 — no double charge