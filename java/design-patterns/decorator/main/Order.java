// "Espresso + Milk + Whip" is not a class — it's an assembly:
Beverage drink = new Espresso();
drink = new Milk(drink);     // wrap the drink
drink = new Whip(drink);     // wrap the wrapper

drink.describe();  // "Espresso + Milk + Whip"
drink.cost();      // 2.0 + 0.5 + 0.7 = 3.2

// Double whip? Wrap twice. Caramel? One new wrapper class:
Beverage fancy = new Whip(new Whip(new Caramel(new Espresso())));