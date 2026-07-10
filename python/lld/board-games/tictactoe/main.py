from engine import TicTacToeEngine
from position import Position


def main():
    engine = TicTacToeEngine(3)  # __init__ calls start()

    moves = [(0, 0), (1, 0), (0, 1), (1, 1), (0, 2)]  # X wins top row
    for r, c in moves:
        player = engine.get_current_player()
        ok = engine.make_move(player, Position(r, c))
        print(f"{player.name} ({player.piece.symbol}) -> "
              f"({r},{c})  {'OK' if ok else 'rejected'}")

    print("Status:", engine.get_status().name)
    winner = engine.get_winner()
    print(f"Winner: {winner.name} ({winner.piece.symbol})"
          if winner else "No winner")


if __name__ == "__main__":
    main()