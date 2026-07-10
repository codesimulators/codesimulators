type Espresso struct{}                 // base: 2.0

// ...now one struct for every combination customers might want:
type EspressoWithMilk struct{}         // 2.5
type EspressoWithWhip struct{}         // 2.7
type EspressoWithMilkAndWhip struct{}  // 3.2
type EspressoWithMilkAndShot struct{}  // 3.4
type EspressoWithWhipAndShot struct{}  // 3.6
type EspressoWithMilkWhipShot struct{} // 4.1

// ❌ N toppings -> up to 2^N types. One new topping doubles the list.