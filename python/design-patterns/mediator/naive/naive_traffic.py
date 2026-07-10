class CommercialAircraft:
    def __init__(self, id_str, other_planes):
        self.id = id_str
        self.other_planes = other_planes

    def request_landing(self):
        # ❌ Direct peer checking
        for plane in self.other_planes:
            if plane.is_landing():
                print("Runway busy")
                return
        print("Landing clear")