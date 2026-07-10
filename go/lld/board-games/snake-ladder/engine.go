package game

import "math/rand"

var tokenPieces = []Piece{
    {Symbol: "🔴", Color: "#EF4444"},
    {Symbol: "🔵", Color: "#3B82F6"},
    {Symbol: "🟢", Color: "#10B981"},
    {Symbol: "🟡", Color: "#F59E0B"},
}

type SnakeLadderEngine struct {
    players            []Player
    config             SnakeLadderConfig
    positions          map[string]int
    currentPlayerIndex int
    status             GameStatus
    moveHistory        []SnakeLadderMove
    winner             *Player
}

func NewSnakeLadderEngine(players []Player) *SnakeLadderEngine {
    return NewSnakeLadderEngineWithConfig(players, DefaultConfig())
}

func NewSnakeLadderEngineWithConfig(players []Player, config SnakeLadderConfig) *SnakeLadderEngine {
    if players == nil {
        players = []Player{
            {Name: "Player 1", Piece: tokenPieces[0]},
            {Name: "Player 2", Piece: tokenPieces[1]},
        }
    }
    e := &SnakeLadderEngine{players: players, config: config}
    e.Start()
    return e
}

func (e *SnakeLadderEngine) Start() {
    e.status = InProgress
    e.currentPlayerIndex = 0
    e.moveHistory = nil
    e.winner = nil
    e.positions = make(map[string]int)
    for _, p := range e.players {
        e.positions[p.Name] = 0
    }
}

func (e *SnakeLadderEngine) RollDice() int {
    return rand.Intn(6) + 1
}

type MoveResult struct {
    Success bool
    Error   string
    Move    *SnakeLadderMove
}

func (e *SnakeLadderEngine) MakeMove(player Player, diceValue int) MoveResult {
    if e.status != InProgress {
        return MoveResult{Success: false, Error: "Game not in progress"}
    }

    currentPos := e.positions[player.Name]
    newPos := currentPos + diceValue

    if newPos > e.config.Finish {
        newPos = currentPos
        m := &SnakeLadderMove{Player: player, DiceValue: diceValue, FromCell: currentPos, ToCell: newPos}
        e.moveHistory = append(e.moveHistory, *m)
        e.currentPlayerIndex = (e.currentPlayerIndex + 1) % len(e.players)
        return MoveResult{Success: true, Move: m}
    }

    landedOnSnake := false
    landedOnLadder := false

    if tail, ok := e.config.Snakes[newPos]; ok {
        newPos = tail
        landedOnSnake = true
    } else if top, ok := e.config.Ladders[newPos]; ok {
        newPos = top
        landedOnLadder = true
    }

    e.positions[player.Name] = newPos
    m := &SnakeLadderMove{
        Player: player, DiceValue: diceValue,
        FromCell: currentPos, ToCell: newPos,
        LandedOnSnake: landedOnSnake, LandedOnLadder: landedOnLadder,
    }
    e.moveHistory = append(e.moveHistory, *m)

    if newPos == e.config.Finish {
        e.status = Completed
        e.winner = &player
    } else {
        e.currentPlayerIndex = (e.currentPlayerIndex + 1) % len(e.players)
    }

    return MoveResult{Success: true, Move: m}
}

func (e *SnakeLadderEngine) GetPosition(player Player) int {
    return e.positions[player.Name]
}

func (e *SnakeLadderEngine) GetCurrentPlayer() Player {
    return e.players[e.currentPlayerIndex]
}

func (e *SnakeLadderEngine) GetStatus() GameStatus {
    return e.status
}

func (e *SnakeLadderEngine) GetWinner() *Player {
    return e.winner
}

type BoardCell struct {
    Cell    int
    Players []Player
    Snake   int
    Ladder  int
    HasSnake  bool
    HasLadder bool
}

func (e *SnakeLadderEngine) GetBoardCells() []BoardCell {
    cells := make([]BoardCell, 0, e.config.Finish)
    for i := 1; i <= e.config.Finish; i++ {
        var occupying []Player
        for _, p := range e.players {
            if e.positions[p.Name] == i {
                occupying = append(occupying, p)
            }
        }
        entry := BoardCell{Cell: i, Players: occupying}
        if tail, ok := e.config.Snakes[i]; ok {
            entry.Snake = tail
            entry.HasSnake = true
        }
        if top, ok := e.config.Ladders[i]; ok {
            entry.Ladder = top
            entry.HasLadder = true
        }
        cells = append(cells, entry)
    }
    return cells
}