from engine import SnakeLadderEngine
from game_status import GameStatus


def main():
    engine = SnakeLadderEngine()
    engine.start()

    turns = 0
    while engine.get_status() == GameStatus.IN_PROGRESS and turns < 300:
        player = engine.get_current_player()
        dice = engine.roll_dice()
        engine.make_move(player, dice)
        print(f"{player.name} rolled {dice} -> cell {engine.get_position(player)}")
        turns += 1

    winner = engine.get_winner()
    print(f"Winner: {winner.name} in {turns} turns" if winner else "No winner")


if __name__ == "__main__":
    main()