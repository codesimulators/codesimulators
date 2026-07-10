from abc import ABC, abstractmethod

class Beverage(ABC):
    @abstractmethod
    def cost(self) -> float: ...
    @abstractmethod
    def describe(self) -> str: ...