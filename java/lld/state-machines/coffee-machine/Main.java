import java.util.Map;

public class Main {
    public static void main(String[] args) {
        CoffeeMachine machine = new CoffeeMachine(
            new Inventory(Map.of("beans", 10, "water", 10, "milk", 2)));

        System.out.println(machine.brew());               // cannot brew while IDLE
        System.out.println(machine.select("cappuccino")); // selected - insert 320c
        System.out.println(machine.pay(200));             // need 120c more
        System.out.println(machine.pay(200));             // payment ok
        System.out.println(machine.brew());               // brewed Cappuccino. change: 80c
        System.out.println(machine.select("latte"));      // out of: milk
    }
}