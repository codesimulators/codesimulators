class Position:
    def __init__(self, row: int, col: int):
        self.row = row
        self.col = col

    def __eq__(self, other):
        return (isinstance(other, Position)
                and self.row == other.row and self.col == other.col)

    def __hash__(self):
        return hash((self.row, self.col))