class Espresso implements Beverage { /* base: 2.0 */ }

// ...now one class for every combination customers might want:
class EspressoWithMilk         implements Beverage { /* 2.5 */ }
class EspressoWithWhip         implements Beverage { /* 2.7 */ }
class EspressoWithMilkAndWhip  implements Beverage { /* 3.2 */ }
class EspressoWithMilkAndShot  implements Beverage { /* 3.4 */ }
class EspressoWithWhipAndShot  implements Beverage { /* 3.6 */ }
class EspressoWithMilkWhipShot implements Beverage { /* 4.1 */ }

// ❌ N toppings -> up to 2^N classes. One new topping doubles the list.