// Waiting for the first coin. Only inserting money does anything here.
public class IdleState extends State {
    public String name() { return "IDLE"; }

    public void insertCoin(VendingMachine m, int cents) {
        m.balance += cents;
        m.setState(new HasMoneyState());
    }

    // selectProduct, dispense, refund — not overridden, inherited reject handles them
}