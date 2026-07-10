class ControlTower(AirTrafficControl):
    def __init__(self):
        self.aircrafts = []
        self.runway_occupied = False
    def register_aircraft(self, a):
        self.aircrafts.append(a)
    def request_landing(self, a):
        if self.runway_occupied:
            return False
        self.runway_occupied = True
        return True