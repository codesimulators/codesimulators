class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light
    def execute(self):
        self.light.turn_on()
    def undo(self):
        self.light.turn_off()

class LightDimCommand(Command):
    def __init__(self, light, level):
        self.light = light
        self.level = level
        self.prev_level = 100
    def execute(self):
        self.prev_level = self.light.get_level()
        self.light.set_level(self.level)
    def undo(self):
        self.light.set_level(self.prev_level)