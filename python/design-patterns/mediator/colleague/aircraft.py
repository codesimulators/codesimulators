class Aircraft:
    def __init__(self, atc: AirTrafficControl, id_str: str):
        self.atc = atc
        self.id = id_str
        self.atc.register_aircraft(self)

    def request_landing(self):
        # Decoupled communication
        if self.atc.request_landing(self):
            print(f"{self.id}: Landing approved")
        else:
            print(f"{self.id}: Holding")