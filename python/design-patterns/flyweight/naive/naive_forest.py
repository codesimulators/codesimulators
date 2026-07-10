class NaiveTree:
    def __init__(self, name, color, x, y):
        self.name = name
        self.color = color
        self.x = x
        self.y = y
        self.texture_data = [1] * 1000000 # ❌ Heavy duplicated data