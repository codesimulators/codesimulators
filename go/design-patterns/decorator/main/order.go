// "Espresso + Milk + Whip" is not a type — it's an assembly:
var drink Beverage = Espresso{}
drink = Milk{AddOn{drink}}     // wrap the drink
drink = Whip{AddOn{drink}}     // wrap the wrapper

drink.Describe()  // "Espresso + Milk + Whip"
drink.Cost()      // 2.0 + 0.5 + 0.7 = 3.2

// Double whip? Wrap twice. Caramel? One new wrapper type:
fancy := Whip{AddOn{Whip{AddOn{Caramel{AddOn{Espresso{}}}}}}}