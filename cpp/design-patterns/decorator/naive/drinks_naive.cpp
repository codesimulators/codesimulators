class Espresso : public Beverage { /* base: 2.0 */ };

// ...now one class for every combination customers might want:
class EspressoWithMilk         : public Beverage { /* 2.5 */ };
class EspressoWithWhip         : public Beverage { /* 2.7 */ };
class EspressoWithMilkAndWhip  : public Beverage { /* 3.2 */ };
class EspressoWithMilkAndShot  : public Beverage { /* 3.4 */ };
class EspressoWithWhipAndShot  : public Beverage { /* 3.6 */ };
class EspressoWithMilkWhipShot : public Beverage { /* 4.1 */ };

// ❌ N toppings -> up to 2^N classes. One new topping doubles the list.