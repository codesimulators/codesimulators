from abc import ABC, abstractmethod

class AirTrafficControl(ABC):
    @abstractmethod
    def register_aircraft(self, aircraft): pass
    @abstractmethod
    def request_landing(self, aircraft) -> bool: pass