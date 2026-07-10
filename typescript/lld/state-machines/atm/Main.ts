import { ATM } from './ATM';

const atm = new ATM(500);

atm.withdraw(100);     // ✗ rejected — can't withdraw while IDLE
atm.insertCard();      // → HAS_CARD
atm.enterPin('0000');  // ✗ wrong PIN (1/3)
atm.enterPin('1234');  // → AUTHENTICATED
atm.withdraw(900);     // ✗ insufficient funds (balance 800)
atm.withdraw(200);     // → dispensed, back to IDLE
atm.enterPin('1234');  // ✗ can't enter PIN while IDLE — full circle