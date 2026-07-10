package main

import (
    "fmt"

    "example.com/chess/game"
)

func main() {
    engine := game.New()
    engine.Start()

    for turn := 0; turn < 6 && engine.GetStatus() == game.InProgress; turn++ {
        player := engine.GetCurrentPlayer()
        played := false
        for r := 0; r < 8 && !played; r++ {
            for c := 0; c < 8 && !played; c++ {
                from := game.Position{Row: r, Col: c}
                moves := engine.GetValidMoves(from)
                if len(moves) > 0 && engine.MakeMove(from, moves[0]) {
                    fmt.Printf("%s (%s) %d,%d -> %d,%d\n",
                        player.Name, player.Piece.Color, r, c, moves[0].Row, moves[0].Col)
                    played = true
                }
            }
        }
    }
}