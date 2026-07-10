class CoffeeMaker(BeverageMaker):
    def _brew(self): print("Brewing coffee")
    def _add_condiments(self): print("Adding milk")

class TeaMaker(BeverageMaker):
    def _brew(self): print("Steeping tea")
    def _add_condiments(self): print("Adding lemon")