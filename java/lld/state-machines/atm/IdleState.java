// Nothing in the machine; the only legal move is to insert a card.
public class IdleState extends ATMState {
    public IdleState(ATM atm) { super(atm); }
    public String name() { return "IDLE"; }

    @Override public void insertCard() {
        System.out.println("  -> card accepted");
        atm.setState(new HasCardState(atm));
    }
}