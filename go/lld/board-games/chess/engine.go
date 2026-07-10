type ChessEngine struct {
    grid               [][]*Piece
    players            []Player
    currentPlayerIndex int
    status             GameStatus
    moveHistory        []Move
    winner             *Player
}

func New() *ChessEngine {
    c := &ChessEngine{
        players: []Player{
            {Name: "White", Piece: Piece{Symbol: "♔", Color: "#FFFFFF", Type: King}},
            {Name: "Black", Piece: Piece{Symbol: "♚", Color: "#000000", Type: King}},
        },
    }
    c.Start()
    return c
}

func (c *ChessEngine) Start() {
    c.status = InProgress; c.currentPlayerIndex = 0; c.moveHistory = nil; c.winner = nil
    c.grid = make([][]*Piece, 8)
    for r := 0; r < 8; r++ { c.grid[r] = make([]*Piece, 8) }
    c.setupBoard()
}

func sym(pt PieceType, white bool) string {
    if white {
        switch pt {
        case King:   return "♔"
        case Queen:  return "♕"
        case Rook:   return "♖"
        case Bishop: return "♗"
        case Knight: return "♘"
        default:     return "♙"
        }
    }
    switch pt {
    case King:   return "♚"
    case Queen:  return "♛"
    case Rook:   return "♜"
    case Bishop: return "♝"
    case Knight: return "♞"
    default:     return "♟"
    }
}

func (c *ChessEngine) setupBoard() {
    backRank := []PieceType{Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook}
    for col := 0; col < 8; col++ {
        c.grid[0][col] = &Piece{Symbol: sym(backRank[col], false), Color: "#000000", Type: backRank[col]}
        c.grid[1][col] = &Piece{Symbol: sym(Pawn, false), Color: "#000000", Type: Pawn}
        c.grid[6][col] = &Piece{Symbol: sym(Pawn, true), Color: "#FFFFFF", Type: Pawn}
        c.grid[7][col] = &Piece{Symbol: sym(backRank[col], true), Color: "#FFFFFF", Type: backRank[col]}
    }
}

func (c *ChessEngine) GetGrid() [][]*Piece {
    cp := make([][]*Piece, 8)
    for r := 0; r < 8; r++ {
        cp[r] = make([]*Piece, 8)
        copy(cp[r], c.grid[r])
    }
    return cp
}

func (c *ChessEngine) GetCurrentPlayer() Player  { return c.players[c.currentPlayerIndex] }
func (c *ChessEngine) GetStatus() GameStatus     { return c.status }
func (c *ChessEngine) GetWinner() *Player         { return c.winner }

func (c *ChessEngine) MakeMove(from, to Position) bool {
    if c.status != InProgress { return false }
    if from.Row < 0 || from.Row >= 8 || from.Col < 0 || from.Col >= 8 { return false }
    if to.Row < 0 || to.Row >= 8 || to.Col < 0 || to.Col >= 8 { return false }

    piece := c.grid[from.Row][from.Col]
    if piece == nil { return false }
    if piece.Color != c.GetCurrentPlayer().Piece.Color { return false }

    dest := c.grid[to.Row][to.Col]
    if dest != nil && dest.Color == piece.Color { return false }

    valid := c.GetValidMoves(from)
    ok := false
    for _, p := range valid {
        if p.Row == to.Row && p.Col == to.Col { ok = true; break }
    }
    if !ok { return false }

    c.grid[to.Row][to.Col] = piece
    c.grid[from.Row][from.Col] = nil
    c.moveHistory = append(c.moveHistory, Move{Player: c.GetCurrentPlayer(), From: from, To: to})

    if !c.bothKingsAlive() { c.status = Completed; w := c.GetCurrentPlayer(); c.winner = &w }

    c.currentPlayerIndex = (c.currentPlayerIndex + 1) % 2
    return true
}

func (c *ChessEngine) bothKingsAlive() bool {
    wk, bk := false, false
    for r := 0; r < 8; r++ {
        for col := 0; col < 8; col++ {
            p := c.grid[r][col]
            if p != nil && p.Type == King {
                if p.Color == "#FFFFFF" { wk = true } else { bk = true }
            }
        }
    }
    return wk && bk
}

func (c *ChessEngine) GetValidMoves(pos Position) []Position {
    piece := c.grid[pos.Row][pos.Col]
    if piece == nil { return nil }
    var moves []Position
    row, col := pos.Row, pos.Col

    switch piece.Type {
    case Pawn:
        dir := -1
        startRow := 6
        if piece.Color == "#000000" { dir = 1; startRow = 1 }
        nr1 := row + dir
        if nr1 >= 0 && nr1 < 8 {
            if c.grid[nr1][col] == nil {
                moves = append(moves, Position{Row: nr1, Col: col})
                if row == startRow {
                    nr2 := row + 2*dir
                    if c.grid[nr2][col] == nil { moves = append(moves, Position{Row: nr2, Col: col}) }
                }
            }
            for _, dc := range []int{-1, 1} {
                nc := col + dc
                if nc >= 0 && nc < 8 {
                    t := c.grid[nr1][nc]
                    if t != nil && t.Color != piece.Color { moves = append(moves, Position{Row: nr1, Col: nc}) }
                }
            }
        }
    case Knight:
        jumps := [8][2]int{{-2, -1}, {-2, 1}, {-1, -2}, {-1, 2}, {1, -2}, {1, 2}, {2, -1}, {2, 1}}
        for _, j := range jumps {
            nr, nc := row+j[0], col+j[1]
            if nr >= 0 && nr < 8 && nc >= 0 && nc < 8 {
                t := c.grid[nr][nc]
                if t == nil || t.Color != piece.Color { moves = append(moves, Position{Row: nr, Col: nc}) }
            }
        }
    case King:
        for dr := -1; dr <= 1; dr++ {
            for dc := -1; dc <= 1; dc++ {
                if dr == 0 && dc == 0 { continue }
                nr, nc := row+dr, col+dc
                if nr >= 0 && nr < 8 && nc >= 0 && nc < 8 {
                    t := c.grid[nr][nc]
                    if t == nil || t.Color != piece.Color { moves = append(moves, Position{Row: nr, Col: nc}) }
                }
            }
        }
    case Rook:
        for _, d := range [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}} {
            c.slideMoves(pos, d[0], d[1], &moves, piece)
        }
    case Bishop:
        for _, d := range [][2]int{{1, 1}, {1, -1}, {-1, 1}, {-1, -1}} {
            c.slideMoves(pos, d[0], d[1], &moves, piece)
        }
    case Queen:
        for _, d := range [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0},
                                   {1, 1}, {1, -1}, {-1, 1}, {-1, -1}} {
            c.slideMoves(pos, d[0], d[1], &moves, piece)
        }
    }
    return moves
}

func (c *ChessEngine) slideMoves(pos Position, dr, dc int, moves *[]Position, piece *Piece) {
    r, col := pos.Row+dr, pos.Col+dc
    for r >= 0 && r < 8 && col >= 0 && col < 8 {
        target := c.grid[r][col]
        if target == nil {
            *moves = append(*moves, Position{Row: r, Col: col})
        } else {
            if target.Color != piece.Color { *moves = append(*moves, Position{Row: r, Col: col}) }
            break
        }
        r += dr
        col += dc
    }
}