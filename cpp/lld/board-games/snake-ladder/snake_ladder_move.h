#include "player.h"

// A record of one turn — also the replay/undo log entry.
struct SnakeLadderMove {
    Player player;
    int diceValue, fromCell, toCell;
    bool landedOnSnake, landedOnLadder;
};