class ChessEngine:
    def __init__(self):
        self.players = [
            Player("White", Piece("♔", "#FFFFFF", PieceType.KING)),
            Player("Black", Piece("♚", "#000000", PieceType.KING)),
        ]
        self.current_player_index = 0
        self.status = GameStatus.NOT_STARTED
        self.move_history: List[Move] = []
        self.winner: Optional[Player] = None
        self.grid: List[List[Optional[Piece]]] = [[None] * 8 for _ in range(8)]
        self.start()

    def start(self):
        self.status = GameStatus.IN_PROGRESS
        self.current_player_index = 0
        self.move_history = []
        self.winner = None
        self.grid = [[None] * 8 for _ in range(8)]
        self._setup_board()

    def _sym(self, pt: PieceType, white: bool) -> str:
        syms = {
            PieceType.KING: ("♔", "♚"), PieceType.QUEEN: ("♕", "♛"),
            PieceType.ROOK: ("♖", "♜"), PieceType.BISHOP: ("♗", "♝"),
            PieceType.KNIGHT: ("♘", "♞"), PieceType.PAWN: ("♙", "♟"),
        }
        return syms[pt][0 if white else 1]

    def _setup_board(self):
        back_rank = [
            PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP,
            PieceType.QUEEN, PieceType.KING, PieceType.BISHOP,
            PieceType.KNIGHT, PieceType.ROOK,
        ]
        for c in range(8):
            self.grid[0][c] = Piece(self._sym(back_rank[c], False), "#000000", back_rank[c])
            self.grid[1][c] = Piece(self._sym(PieceType.PAWN, False), "#000000", PieceType.PAWN)
            self.grid[6][c] = Piece(self._sym(PieceType.PAWN, True), "#FFFFFF", PieceType.PAWN)
            self.grid[7][c] = Piece(self._sym(back_rank[c], True), "#FFFFFF", back_rank[c])

    def get_grid(self):
        return [row[:] for row in self.grid]

    def get_current_player(self) -> Player:
        return self.players[self.current_player_index]

    def get_status(self) -> GameStatus:
        return self.status

    def get_winner(self) -> Optional[Player]:
        return self.winner

    def make_move(self, from_pos: Position, to: Position) -> bool:
        if self.status != GameStatus.IN_PROGRESS:
            return False
        if not (0 <= from_pos.row < 8 and 0 <= from_pos.col < 8):
            return False
        if not (0 <= to.row < 8 and 0 <= to.col < 8):
            return False

        piece = self.grid[from_pos.row][from_pos.col]
        if piece is None:
            return False
        if piece.color != self.get_current_player().piece.color:
            return False

        dest = self.grid[to.row][to.col]
        if dest is not None and dest.color == piece.color:
            return False

        valid = self.get_valid_moves(from_pos)
        if not any(p.row == to.row and p.col == to.col for p in valid):
            return False

        self.grid[to.row][to.col] = piece
        self.grid[from_pos.row][from_pos.col] = None
        self.move_history.append(Move(self.get_current_player(), from_pos, to))

        if not self._both_kings_alive():
            self.status = GameStatus.COMPLETED
            self.winner = self.get_current_player()

        self.current_player_index = (self.current_player_index + 1) % 2
        return True

    def _both_kings_alive(self) -> bool:
        wk = bk = False
        for r in range(8):
            for c in range(8):
                p = self.grid[r][c]
                if p is not None and p.type == PieceType.KING:
                    if p.color == "#FFFFFF":
                        wk = True
                    else:
                        bk = True
        return wk and bk

    def get_valid_moves(self, pos: Position) -> List[Position]:
        piece = self.grid[pos.row][pos.col]
        if piece is None:
            return []
        moves: List[Position] = []
        row, col = pos.row, pos.col

        if piece.type == PieceType.PAWN:
            dir = -1 if piece.color == "#FFFFFF" else 1
            start_row = 6 if piece.color == "#FFFFFF" else 1
            nr1 = row + dir
            if 0 <= nr1 < 8:
                if self.grid[nr1][col] is None:
                    moves.append(Position(nr1, col))
                    if row == start_row:
                        nr2 = row + 2 * dir
                        if self.grid[nr2][col] is None:
                            moves.append(Position(nr2, col))
                for dc in (-1, 1):
                    nc = col + dc
                    if 0 <= nc < 8:
                        target = self.grid[nr1][nc]
                        if target is not None and target.color != piece.color:
                            moves.append(Position(nr1, nc))
        elif piece.type == PieceType.KNIGHT:
            for dr, dc in [(-2, -1), (-2, 1), (-1, -2), (-1, 2),
                           (1, -2), (1, 2), (2, -1), (2, 1)]:
                nr, nc = row + dr, col + dc
                if 0 <= nr < 8 and 0 <= nc < 8:
                    target = self.grid[nr][nc]
                    if target is None or target.color != piece.color:
                        moves.append(Position(nr, nc))
        elif piece.type == PieceType.KING:
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    if dr == 0 and dc == 0:
                        continue
                    nr, nc = row + dr, col + dc
                    if 0 <= nr < 8 and 0 <= nc < 8:
                        target = self.grid[nr][nc]
                        if target is None or target.color != piece.color:
                            moves.append(Position(nr, nc))
        elif piece.type == PieceType.ROOK:
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                self._slide_moves(pos, dr, dc, moves, piece)
        elif piece.type == PieceType.BISHOP:
            for dr, dc in [(1, 1), (1, -1), (-1, 1), (-1, -1)]:
                self._slide_moves(pos, dr, dc, moves, piece)
        elif piece.type == PieceType.QUEEN:
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0),
                           (1, 1), (1, -1), (-1, 1), (-1, -1)]:
                self._slide_moves(pos, dr, dc, moves, piece)
        return moves

    def _slide_moves(self, pos: Position, dr: int, dc: int,
                     moves: List[Position], piece: Piece):
        r, c = pos.row + dr, pos.col + dc
        while 0 <= r < 8 and 0 <= c < 8:
            target = self.grid[r][c]
            if target is None:
                moves.append(Position(r, c))
            else:
                if target.color != piece.color:
                    moves.append(Position(r, c))
                break
            r += dr
            c += dc