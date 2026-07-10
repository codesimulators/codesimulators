class TreeType:
    def __init__(self, name: str, color: str):
        self.name = name
        self.color = color
        self.texture_data = [1] * 1000000
    def draw(self, x, y):
        print(f"Drawing {self.name} at {x}, {y}")