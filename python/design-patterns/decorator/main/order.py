# "Espresso + Milk + Whip" is not a class — it's an assembly:
drink = Espresso()
drink = Milk(drink)     # wrap the drink
drink = Whip(drink)     # wrap the wrapper

drink.describe()  # "Espresso + Milk + Whip"
drink.cost()      # 2.0 + 0.5 + 0.7 = 3.2

# Double whip? Wrap twice. Caramel? One new wrapper class:
fancy = Whip(Whip(Caramel(Espresso())))