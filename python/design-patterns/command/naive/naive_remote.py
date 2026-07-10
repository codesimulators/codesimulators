class RemoteControl:
    def __init__(self):
        self.light = Light()
        self.fan = Fan()

    # ❌ Rigid buttons bound to specific functions
    def press_button_1(self):
        self.light.turn_on()

    def press_button_2(self):
        self.fan.set_speed(3)