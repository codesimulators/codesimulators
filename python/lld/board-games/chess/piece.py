from piece_type import PieceType


class Piece:
    def __init__(self, symbol: str, color: str, piece_type: PieceType):
        self.symbol = symbol
        self.color = color
        self.type = piece_type