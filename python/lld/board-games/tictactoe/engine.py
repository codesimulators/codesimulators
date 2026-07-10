from typing import List, Optional
from game_status import GameStatus
from position import Position
from piece import Piece
from player import Player
from move import Move


class TicTacToeEngine:
    def __init__(self, size: int = 3):
        self.players = [
            Player("Player 1", Piece("X", "#818CF8")),
            Player("Player 2", Piece("O", "#F59E0B")),
        ]
        self.size = size
        self.current_player_index = 0
        self.status = GameStatus.NOT_STARTED
        self.move_history: List[Move] = []
        self.winner: Optional[Player] = None
        self.start()

    def start(self):
        self.status = GameStatus.IN_PROGRESS
        self.current_player_index = 0
        self.move_history = []
        self.winner = None
        self.grid = [[None] * self.size
                     for _ in range(self.size)]

    def get_grid(self):
        return [row[:] for row in self.grid]

    def get_current_player(self) -> Player:
        return self.players[self.current_player_index]

    def get_status(self) -> GameStatus:
        return self.status

    def get_winner(self) -> Optional[Player]:
        return self.winner

    def make_move(self, player: Player, to: Position) -> bool:
        if self.status != GameStatus.IN_PROGRESS:
            return False
        if not (0 <= to.row < self.size and
                0 <= to.col < self.size):
            return False
        if self.grid[to.row][to.col] is not None:
            return False
        if player != self.players[self.current_player_index]:
            return False

        self.grid[to.row][to.col] = player.piece
        self.move_history.append(Move(player, to))

        if self._check_win(to):
            self.status = GameStatus.COMPLETED
            self.winner = player
            return True

        if all(all(c is not None for c in row)
               for row in self.grid):
            self.status = GameStatus.DRAW
            return True

        self.current_player_index = (
            self.current_player_index + 1
        ) % len(self.players)
        return True

    def _check_win(self, pos: Position) -> bool:
        piece = self.grid[pos.row][pos.col]
        if piece is None:
            return False

        dirs = [(0, 1), (1, 0), (1, 1), (1, -1)]
        for dr, dc in dirs:
            count = 1
            for direction in (-1, 1):
                for i in range(1, self.size):
                    r = pos.row + dr * i * direction
                    c = pos.col + dc * i * direction
                    if not (0 <= r < self.size and
                            0 <= c < self.size):
                        break
                    cell = self.grid[r][c]
                    if cell is not None and                        cell.symbol == piece.symbol:
                        count += 1
                    else:
                        break
            if count >= self.size:
                return True
        return False