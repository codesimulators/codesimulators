class Tree:
    def __init__(self, x: float, y: float, tree_type: TreeType):
        self.x = x
        self.y = y
        self.type = tree_type
    def draw(self):
        self.type.draw(self.x, self.y)