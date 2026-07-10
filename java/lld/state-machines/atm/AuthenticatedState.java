// Authenticated. Withdraw (guarded by balance AND cash) or eject.
public class AuthenticatedState extends ATMState {
    public AuthenticatedState(ATM atm) { super(atm); }
    public String name() { return "AUTHENTICATED"; }

    @Override public void withdraw(int amount) {
        if (amount > atm.getBalance()) { System.out.println("  x insufficient funds"); return; }
        if (amount > atm.getCash())    { System.out.println("  x machine low on cash"); return; }
        atm.debit(amount);
        atm.dispense(amount);          // transient DISPENSING step
        System.out.println("  -> dispensed $" + amount + ", card returned");
        atm.setState(new IdleState(atm));
    }

    @Override public void ejectCard() {
        System.out.println("  -> card returned");
        atm.setState(new IdleState(atm));
    }
}