class CoffeeMaker:
    def prepare(self):
        print("Boiling water") # ❌ duplicated
        print("Brewing coffee")
        print("Pouring into cup") # ❌ duplicated
        print("Adding sugar")

class TeaMaker:
    def prepare(self):
        print("Boiling water") # ❌ duplicated
        print("Steeping tea")
        print("Pouring into cup") # ❌ duplicated
        print("Adding lemon")