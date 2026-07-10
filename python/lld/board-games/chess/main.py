from engine import ChessEngine
from position import Position
from game_status import GameStatus


def main():
    engine = ChessEngine()  # __init__ calls start()

    for _ in range(6):
        if engine.get_status() != GameStatus.IN_PROGRESS:
            break
        player = engine.get_current_player()
        played = False
        for r in range(8):
            for c in range(8):
                from_pos = Position(r, c)
                moves = engine.get_valid_moves(from_pos)
                if moves and engine.make_move(from_pos, moves[0]):
                    to = moves[0]
                    print(f"{player.name} ({player.piece.color}) "
                          f"{r},{c} -> {to.row},{to.col}")
                    played = True
                    break
            if played:
                break


if __name__ == "__main__":
    main()