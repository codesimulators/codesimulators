public class Main {
    public static void main(String[] args) {
        WalletManager bank = new WalletManager();
        bank.open("A", "alice");
        bank.open("B", "bob");

        bank.addMoney("A", 5000, "k-topup-1");   // A: $50.00
        bank.addMoney("B", 5000, "k-topup-2");   // B: $50.00

        bank.transfer("A", "B", 2000, "k-transfer-1");
        System.out.println(bank.getBalance("A") + " " + bank.getBalance("B"));   // 3000 7000

        bank.transfer("A", "B", 2000, "k-transfer-1");   // retried — SAME key
        System.out.println(bank.getBalance("A") + " " + bank.getBalance("B"));   // still 3000 7000
    }
}