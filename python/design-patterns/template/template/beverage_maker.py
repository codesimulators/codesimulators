from abc import ABC, abstractmethod

class BeverageMaker(ABC):
    # The Template Method
    def prepare_recipe(self):
        self._boil_water()
        self._brew()
        self._pour_in_cup()
        self._add_condiments()

    def _boil_water(self): print("Boiling water to 95C")
    def _pour_in_cup(self): print("Pouring in cup")

    @abstractmethod
    def _brew(self): pass
    @abstractmethod
    def _add_condiments(self): pass