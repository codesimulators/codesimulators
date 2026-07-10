// The CONTEXT. Holds current state + data and delegates every action.
public class ATM {
    private ATMState state;
    private int balance = 800;
    private int cash;
    private final String pin = "1234";

    public ATM(int cash) { this.cash = cash; this.state = new IdleState(this); }

    public void setState(ATMState s) { this.state = s; }
    public int getBalance() { return balance; }
    public int getCash() { return cash; }
    public boolean validatePin(String p) { return pin.equals(p); }
    public void debit(int n) { balance -= n; }
    public void dispense(int n) { cash -= n; }

    // Public API — pure delegation, no mode conditionals.
    public void insertCard()         { log("insertCard"); state.insertCard(); }
    public void enterPin(String pin) { log("enterPin");   state.enterPin(pin); }
    public void withdraw(int n)      { log("withdraw " + n); state.withdraw(n); }
    public void ejectCard()          { log("ejectCard");  state.ejectCard(); }

    private void log(String a) { System.out.println("[" + state.name() + "] " + a + "()"); }
}