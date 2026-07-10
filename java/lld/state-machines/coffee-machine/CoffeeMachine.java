// The FSM. Each method is a guarded transition; a failed guard leaves state
// unchanged and refunds any money taken.
public class CoffeeMachine {
    public enum State { IDLE, SELECTED, PAID }

    private State state = State.IDLE;
    private Recipe selected = null;
    private int paidCents = 0;
    private final Inventory inventory;

    public CoffeeMachine(Inventory inventory) { this.inventory = inventory; }

    public String select(String key) {
        if (state != State.IDLE) return deny("select");
        Recipe r = Recipe.MENU.get(key);
        if (r == null) return "no such drink";
        if (!inventory.canMake(r)) return "out of: " + String.join(", ", inventory.missing(r));
        selected = r; state = State.SELECTED;
        return "selected " + r.name() + " - insert " + r.priceCents() + "c";
    }

    public String pay(int cents) {
        if (state != State.SELECTED) return deny("pay");
        paidCents += cents;
        if (paidCents < selected.priceCents())
            return "need " + (selected.priceCents() - paidCents) + "c more";
        state = State.PAID;
        return "payment ok - press brew";
    }

    public String brew() {
        if (state != State.PAID) return deny("brew");
        if (!inventory.canMake(selected)) return refund("ingredient ran out");
        inventory.consume(selected);
        int change = paidCents - selected.priceCents();
        String name = selected.name();
        reset();
        return "brewed " + name + ". change: " + change + "c";
    }

    public String cancel() { return paidCents > 0 ? refund("cancelled") : "cancelled"; }

    private String refund(String reason) { int a = paidCents; reset(); return reason + " - refunded " + a + "c"; }
    private String deny(String a) { return "cannot " + a + " while " + state; }
    private void reset() { state = State.IDLE; selected = null; paidCents = 0; }
    public State getState() { return state; }
}