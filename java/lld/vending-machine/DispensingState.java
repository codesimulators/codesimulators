// Busy vending — reject input; only dispense() completes the sale.
public class DispensingState extends State {
    public String name() { return "DISPENSING"; }

    public void insertCoin(VendingMachine m, int cents) { m.returnChange(cents); }

    // selectProduct — not overridden, inherited reject handles it

    public void dispense(VendingMachine m) {
        Product p = m.products.get(m.selected);
        p.stock -= 1;
        int change = m.balance - p.price;
        if (change > 0) m.returnChange(change);
        m.balance = 0;
        m.selected = null;
        m.setState(new IdleState());
    }

    // refund — not overridden, inherited reject handles it
}