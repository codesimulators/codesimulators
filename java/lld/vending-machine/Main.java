import java.util.Map;

public class Main {
    public static void main(String[] args) {
        var vm = new VendingMachine(Map.of(
            "COKE", new VendingMachine.Product(100, 2),
            "WATER", new VendingMachine.Product(75, 0)));

        vm.selectProduct("COKE");   // IDLE: no money → ignored
        vm.insertCoin(50);          // IDLE → HAS_MONEY
        vm.insertCoin(50);          // balance 100
        vm.selectProduct("WATER");  // sold out → stays HAS_MONEY
        vm.selectProduct("COKE");   // → DISPENSING
        vm.dispense();              // vend → IDLE, stock 1
    }
}