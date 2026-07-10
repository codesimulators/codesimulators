from typing import Optional
from player import Player
from position import Position


class Move:
    def __init__(self, player: Player, from_pos: Optional[Position], to: Position):
        self.player = player
        self.from_pos = from_pos
        self.to = to