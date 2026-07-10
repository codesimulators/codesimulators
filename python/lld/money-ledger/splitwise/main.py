from equal_split import EqualSplit
from group import Group

trip = Group()

trip.add_expense("alice", 6000, ["alice", "bob", "carol", "dave"], EqualSplit())  # dinner $60 / 4
trip.add_expense("bob", 4000, ["bob", "carol"], EqualSplit())                     # cab $40 / 2
trip.add_expense("carol", 1200, ["alice", "carol", "dave"], EqualSplit())         # coffee $12 / 3

print(trip.get_balances())
# {'alice': 4100, 'bob': 500, 'carol': -2700, 'dave': -1900}  (cents)

for t in trip.simplify_debts():
    print(f"{t.from_id} -> {t.to_id} : {t.amount_cents}")
# carol -> alice : 2700
# dave  -> alice : 1400
# dave  -> bob   : 500