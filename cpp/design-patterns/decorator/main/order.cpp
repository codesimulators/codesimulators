// "Espresso + Milk + Whip" is not a class — it's an assembly:
std::unique_ptr<Beverage> drink = std::make_unique<Espresso>();
drink = std::make_unique<Milk>(std::move(drink));   // wrap the drink
drink = std::make_unique<Whip>(std::move(drink));   // wrap the wrapper

drink->describe();  // "Espresso + Milk + Whip"
drink->cost();      // 2.0 + 0.5 + 0.7 = 3.2