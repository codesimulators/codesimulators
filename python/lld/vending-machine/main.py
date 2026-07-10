from vending_machine import VendingMachine, Product

vm = VendingMachine({"COKE": Product(100, 2), "WATER": Product(75, 0)})

vm.select_product("COKE")   # IDLE: no money -> ignored
vm.insert_coin(50)          # IDLE -> HAS_MONEY
vm.insert_coin(50)          # balance 100
vm.select_product("WATER")  # sold out -> stays HAS_MONEY
vm.select_product("COKE")   # -> DISPENSING
vm.dispense()               # vend -> IDLE, stock 1
