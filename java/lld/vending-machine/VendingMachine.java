import java.util.Map;

// The CONTEXT — one 'synchronized' lock point makes the machine thread-safe.
public class VendingMachine {
    private State state = new IdleState();
    int balance = 0;
    String selected = null;
    final Map<String, Product> products;

    public VendingMachine(Map<String, Product> products) {
        this.products = products;
    }

    void setState(State s) { this.state = s; }
    void returnChange(int cents) { System.out.println("return " + cents + "c"); }

    public synchronized void insertCoin(int cents)     { state.insertCoin(this, cents); }
    public synchronized void selectProduct(String id)  { state.selectProduct(this, id); }
    public synchronized void dispense()                { state.dispense(this); }
    public synchronized void refund()                  { state.refund(this); }

    static class Product {
        int price, stock;

        Product(int p, int s) { price = p; stock = s; }
    }
}