package game

// A record of one turn — also the replay/undo log entry.
type SnakeLadderMove struct {
    Player         Player
    DiceValue      int
    FromCell       int
    ToCell         int
    LandedOnSnake  bool
    LandedOnLadder bool
}