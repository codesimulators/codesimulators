package game

type GameStatus int

const (
    NotStarted GameStatus = iota
    InProgress
    Completed
    Draw
)