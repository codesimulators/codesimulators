import random

from snake_ladder_config import SnakeLadderConfig, DEFAULT_CONFIG

TOKEN_PIECES = [
    Piece('\U0001f534', '#EF4444'),
    Piece('\U0001f535', '#3B82F6'),
    Piece('\U0001f7e2', '#10B981'),
    Piece('\U0001f7e1', '#F59E0B'),
]

DEFAULT_SL_PLAYERS = [
    Player('Player 1', TOKEN_PIECES[0]),
    Player('Player 2', TOKEN_PIECES[1]),
]

class SnakeLadderEngine:
    def __init__(self, players: List[Player] = None, config: SnakeLadderConfig = None):
        self.players = players or DEFAULT_SL_PLAYERS
        self.config = config or DEFAULT_CONFIG
        self.positions: Dict[str, int] = {}
        self.current_player_index = 0
        self.status = GameStatus.NOT_STARTED
        self.move_history: List[SnakeLadderMove] = []
        self.winner: Optional[Player] = None

    def start(self):
        self.status = GameStatus.IN_PROGRESS
        self.current_player_index = 0
        self.move_history = []
        self.winner = None
        self.positions = {p.name: 0 for p in self.players}

    def roll_dice(self) -> int:
        return random.randint(1, 6)

    def make_move(self, player: Player, dice_value: int) -> Dict:
        if self.status != GameStatus.IN_PROGRESS:
            return {'success': False, 'error': 'Game not in progress', 'move': None}

        current_pos = self.positions.get(player.name, 0)
        new_pos = current_pos + dice_value

        if new_pos > self.config.finish:
            new_pos = current_pos
            move = SnakeLadderMove(player, dice_value, current_pos, new_pos)
            self.move_history.append(move)
            self.current_player_index = (self.current_player_index + 1) % len(self.players)
            return {'success': True, 'error': None, 'move': move}

        landed_on_snake = False
        landed_on_ladder = False

        if new_pos in self.config.snakes:
            new_pos = self.config.snakes[new_pos]
            landed_on_snake = True
        elif new_pos in self.config.ladders:
            new_pos = self.config.ladders[new_pos]
            landed_on_ladder = True

        self.positions[player.name] = new_pos
        move = SnakeLadderMove(player, dice_value, current_pos, new_pos,
                                landed_on_snake, landed_on_ladder)
        self.move_history.append(move)

        if new_pos == self.config.finish:
            self.status = GameStatus.COMPLETED
            self.winner = player
        else:
            self.current_player_index = (self.current_player_index + 1) % len(self.players)

        return {'success': True, 'error': None, 'move': move}

    def get_position(self, player: Player) -> int:
        return self.positions.get(player.name, 0)

    def get_current_player(self) -> Player:
        return self.players[self.current_player_index]

    def get_status(self) -> GameStatus:
        return self.status

    def get_winner(self) -> Optional[Player]:
        return self.winner

    def get_board_cells(self) -> List[Dict]:
        cells = []
        for i in range(1, self.config.finish + 1):
            occupying = [p for p in self.players if self.positions.get(p.name) == i]
            entry = {'cell': i, 'players': occupying}
            if i in self.config.snakes:
                entry['snake'] = self.config.snakes[i]
            if i in self.config.ladders:
                entry['ladder'] = self.config.ladders[i]
            cells.append(entry)
        return cells