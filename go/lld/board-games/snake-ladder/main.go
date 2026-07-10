package main

import (
    "fmt"

    "example.com/snakeladder/game"
)

func main() {
    engine := game.NewSnakeLadderEngine(nil) // nil => default 2 players, calls Start()

    turns := 0
    for engine.GetStatus() == game.InProgress && turns < 300 {
        player := engine.GetCurrentPlayer()
        dice := engine.RollDice()
        engine.MakeMove(player, dice)
        fmt.Printf("%s rolled %d -> cell %d\n",
            player.Name, dice, engine.GetPosition(player))
        turns++
    }

    if w := engine.GetWinner(); w != nil {
        fmt.Printf("Winner: %s in %d turns\n", w.Name, turns)
    } else {
        fmt.Println("No winner")
    }
}