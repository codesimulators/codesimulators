package game

type GameStatus int

const (
    NotStarted  GameStatus = 0
    InProgress  GameStatus = 1
    Completed   GameStatus = 2
    Draw        GameStatus = 3
)