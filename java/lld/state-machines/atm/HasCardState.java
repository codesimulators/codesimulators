// Card is in. Enter a PIN (three tries) or eject. Can't withdraw yet.
public class HasCardState extends ATMState {
    private int tries = 0;
    public HasCardState(ATM atm) { super(atm); }
    public String name() { return "HAS_CARD"; }

    @Override public void enterPin(String pin) {
        if (atm.validatePin(pin)) {
            System.out.println("  -> PIN ok, authenticated");
            atm.setState(new AuthenticatedState(atm));
        } else if (++tries >= 3) {
            System.out.println("  x 3 wrong PINs - card retained");
            atm.setState(new IdleState(atm));
        } else {
            System.out.println("  x wrong PIN (" + tries + "/3)");
        }
    }

    @Override public void ejectCard() {
        System.out.println("  -> card returned");
        atm.setState(new IdleState(atm));
    }
}