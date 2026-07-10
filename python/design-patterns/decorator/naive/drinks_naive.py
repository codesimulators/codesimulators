class Espresso(Beverage): ...            # base: 2.0

# ...now one class for every combination customers might want:
class EspressoWithMilk(Beverage): ...        # 2.5
class EspressoWithWhip(Beverage): ...        # 2.7
class EspressoWithMilkAndWhip(Beverage): ... # 3.2
class EspressoWithMilkAndShot(Beverage): ... # 3.4
class EspressoWithWhipAndShot(Beverage): ... # 3.6
class EspressoWithMilkWhipShot(Beverage): ...# 4.1

# ❌ N toppings -> up to 2^N classes. Adding ONE topping (Caramel) means
#    writing a new "...AndCaramel" version of EVERY class above.