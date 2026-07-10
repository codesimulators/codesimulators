from coffee_machine import CoffeeMachine
from inventory import Inventory

machine = CoffeeMachine(Inventory({"beans": 10, "water": 10, "milk": 2}))

print(machine.brew())               # cannot brew while IDLE
print(machine.select("cappuccino")) # selected - insert 320c
print(machine.pay(200))             # need 120c more
print(machine.pay(200))             # payment ok
print(machine.brew())               # brewed Cappuccino. change: 80c
print(machine.select("latte"))      # out of: milk