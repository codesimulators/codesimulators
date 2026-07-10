public class Main {
    public static void main(String[] args) {
        ATM atm = new ATM(500);
        atm.withdraw(100);     // x rejected - can't withdraw while IDLE
        atm.insertCard();      // -> HAS_CARD
        atm.enterPin("0000");  // x wrong PIN (1/3)
        atm.enterPin("1234");  // -> AUTHENTICATED
        atm.withdraw(900);     // x insufficient funds
        atm.withdraw(200);     // -> dispensed, back to IDLE
        atm.enterPin("1234");  // x can't enter PIN while IDLE
    }
}