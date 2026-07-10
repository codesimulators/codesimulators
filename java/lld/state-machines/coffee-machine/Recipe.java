import java.util.Map;

// A drink is DATA: price + how much of each ingredient it needs.
public record Recipe(String name, int priceCents, Map<String, Integer> needs) {

    public static final Map<String, Recipe> MENU = Map.of(
        "espresso",   new Recipe("Espresso",   200, Map.of("beans", 2, "water", 1)),
        "cappuccino", new Recipe("Cappuccino", 320, Map.of("beans", 2, "water", 1, "milk", 2)),
        "latte",      new Recipe("Latte",      350, Map.of("beans", 2, "water", 1, "milk", 3))
    );
}