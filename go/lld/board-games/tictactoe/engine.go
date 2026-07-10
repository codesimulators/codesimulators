package game

type TicTacToeEngine struct {
    grid               [][]*Piece
    players            []Player
    size               int
    currentPlayerIndex int
    status             GameStatus
    moveHistory        []Move
    winner             *Player
}

func New(size int) *TicTacToeEngine {
    t := &TicTacToeEngine{
        players: []Player{
            {Name: "Player 1", Piece: Piece{Symbol: "X", Color: "#818CF8"}},
            {Name: "Player 2", Piece: Piece{Symbol: "O", Color: "#F59E0B"}},
        },
        size: size,
    }
    t.Start()
    return t
}

func (t *TicTacToeEngine) Start() {
    t.status = InProgress
    t.currentPlayerIndex = 0
    t.moveHistory = nil
    t.winner = nil
    t.grid = make([][]*Piece, t.size)
    for r := 0; r < t.size; r++ {
        t.grid[r] = make([]*Piece, t.size)
    }
}

func (t *TicTacToeEngine) GetGrid() [][]*Piece {
    c := make([][]*Piece, t.size)
    for r := 0; r < t.size; r++ {
        c[r] = make([]*Piece, t.size)
        for col := 0; col < t.size; col++ {
            if t.grid[r][col] != nil {
                p := *t.grid[r][col]
                c[r][col] = &p
            }
        }
    }
    return c
}

func (t *TicTacToeEngine) GetCurrentPlayer() Player {
    return t.players[t.currentPlayerIndex]
}

func (t *TicTacToeEngine) GetStatus() GameStatus {
    return t.status
}

func (t *TicTacToeEngine) GetWinner() *Player {
    return t.winner
}

func (t *TicTacToeEngine) MakeMove(
    player Player,
    to Position,
) bool {
    if t.status != InProgress {
        return false
    }
    if to.Row < 0 || to.Row >= t.size ||
        to.Col < 0 || to.Col >= t.size {
        return false
    }
    if t.grid[to.Row][to.Col] != nil {
        return false
    }

    t.grid[to.Row][to.Col] = &player.Piece
    t.moveHistory = append(
        t.moveHistory,
        Move{Player: player, To: to},
    )

    if t.checkWin(to) {
        t.status = Completed
        t.winner = &player
        return true
    }

    full := true
    for r := 0; r < t.size && full; r++ {
        for c := 0; c < t.size && full; c++ {
            if t.grid[r][c] == nil {
                full = false
            }
        }
    }
    if full {
        t.status = Draw
        return true
    }

    t.currentPlayerIndex =
        (t.currentPlayerIndex + 1) % len(t.players)
    return true
}

func (t *TicTacToeEngine) checkWin(pos Position) bool {
    piece := t.grid[pos.Row][pos.Col]
    if piece == nil {
        return false
    }

    dirs := [4][2]int{
        {0, 1}, {1, 0}, {1, 1}, {1, -1},
    }
    for _, d := range dirs {
        count := 1
        for _, dir := range []int{-1, 1} {
            for i := 1; i < t.size; i++ {
                r := pos.Row + d[0]*i*dir
                c := pos.Col + d[1]*i*dir
                if r < 0 || r >= t.size ||
                    c < 0 || c >= t.size {
                    break
                }
                cell := t.grid[r][c]
                if cell != nil &&
                    cell.Symbol == piece.Symbol {
                    count++
                } else {
                    break
                }
            }
        }
        if count >= t.size {
            return true
        }
    }
    return false
}