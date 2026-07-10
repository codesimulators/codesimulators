package main

import (
    "fmt"

    "example.com/tictactoe/game"
)

func main() {
    engine := game.New(3) // New calls Start()

    moves := []game.Position{
        {Row: 0, Col: 0}, {Row: 1, Col: 0},
        {Row: 0, Col: 1}, {Row: 1, Col: 1},
        {Row: 0, Col: 2}, // X completes the top row
    }
    for _, to := range moves {
        p := engine.GetCurrentPlayer()
        ok := engine.MakeMove(p, to)
        fmt.Printf("%s (%s) -> (%d,%d)  %v\n",
            p.Name, p.Piece.Symbol, to.Row, to.Col, ok)
    }

    if w := engine.GetWinner(); w != nil {
        fmt.Printf("Winner: %s (%s)\n", w.Name, w.Piece.Symbol)
    } else {
        fmt.Println("No winner")
    }
}