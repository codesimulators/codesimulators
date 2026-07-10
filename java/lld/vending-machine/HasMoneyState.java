// Money is in. Take more coins, or select a product.
public class HasMoneyState extends State {
    public String name() { return "HAS_MONEY"; }

    public void insertCoin(VendingMachine m, int cents) { m.balance += cents; }

    public void selectProduct(VendingMachine m, String id) {
        Product p = m.products.get(id);
        if (p == null || p.stock == 0) return;
        if (m.balance < p.price) return;
        m.selected = id;
        m.setState(new DispensingState());
    }

    // dispense — not overridden, inherited reject handles it

    public void refund(VendingMachine m) {
        m.returnChange(m.balance);
        m.balance = 0;
        m.setState(new IdleState());
    }
}