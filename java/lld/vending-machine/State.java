// The contract every state must honour. Each action defaults to
// "not allowed here", so a concrete state overrides only its LEGAL actions.
public abstract class State {
    public void insertCoin(VendingMachine m, int cents)    { reject("insert coin"); }
    public void selectProduct(VendingMachine m, String id) { reject("select product"); }
    public void dispense(VendingMachine m)                 { reject("dispense"); }
    public void refund(VendingMachine m)                   { reject("refund"); }

    public abstract String name();

    protected void reject(String action) {
        System.out.println("  x cannot " + action + " while " + name());
    }
}