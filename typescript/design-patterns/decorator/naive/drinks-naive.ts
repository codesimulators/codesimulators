class Espresso implements Beverage { /* base: 2.0 */ }

// ...now one class for every combination customers might want:
class EspressoWithMilk          implements Beverage { /* 2.5 */ }
class EspressoWithWhip          implements Beverage { /* 2.7 */ }
class EspressoWithMilkAndWhip   implements Beverage { /* 3.2 */ }
class EspressoWithMilkAndShot   implements Beverage { /* 3.4 */ }
class EspressoWithWhipAndShot   implements Beverage { /* 3.6 */ }
class EspressoWithMilkWhipShot  implements Beverage { /* 4.1 */ }
// ...and we haven't even added Syrup yet.

// ❌ N toppings → up to 2^N classes. Adding ONE topping (Caramel) means
//    writing a new "...AndCaramel" version of EVERY class above.