// The state interface as an abstract base: each action defaults to
// "not allowed here", so a concrete state overrides only its LEGAL actions.
public abstract class ATMState {
    protected final ATM atm;
    protected ATMState(ATM atm) { this.atm = atm; }

    public void insertCard()          { reject("insert card"); }
    public void enterPin(String pin)  { reject("enter PIN"); }
    public void withdraw(int amount)  { reject("withdraw"); }
    public void ejectCard()           { reject("eject card"); }

    public abstract String name();

    protected void reject(String action) {
        System.out.println("  x cannot " + action + " while " + name());
    }
}