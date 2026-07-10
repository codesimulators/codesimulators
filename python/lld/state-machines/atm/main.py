from atm import ATM

atm = ATM(500)
atm.withdraw(100)      # x rejected - can't withdraw while IDLE
atm.insert_card()      # -> HAS_CARD
atm.enter_pin("0000")  # x wrong PIN (1/3)
atm.enter_pin("1234")  # -> AUTHENTICATED
atm.withdraw(900)      # x insufficient funds
atm.withdraw(200)      # -> dispensed, back to IDLE
atm.enter_pin("1234")  # x can't enter PIN while IDLE