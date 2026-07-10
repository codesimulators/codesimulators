from player import Player


# A record of one turn — also the replay/undo log entry.
class SnakeLadderMove:
    def __init__(self, player: Player, dice_value: int, from_cell: int, to_cell: int,
                 landed_on_snake: bool = False, landed_on_ladder: bool = False):
        self.player = player
        self.dice_value = dice_value
        self.from_cell = from_cell
        self.to_cell = to_cell
        self.landed_on_snake = landed_on_snake
        self.landed_on_ladder = landed_on_ladder