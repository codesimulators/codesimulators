def solveNQueens(n):
    res = [] # @viz:init
    board = [["."] * n for _ in range(n)] # @viz:init

    def backtrack(row):
        # 1️⃣ Base Case
        if row == n: # @viz:baseCheck
            res.append(["".join(r) for r in board]) # @viz:baseAdd
            return # @viz:baseReturn

        # 2️⃣ Explore
        for col in range(n): # @viz:loop
            if isSafe(row, col, board, n): # @viz:validCheck
                board[row][col] = "Q" # @viz:place
                backtrack(row + 1) # @viz:recurse
                board[row][col] = "." # @viz:backtrack

    def isSafe(row, col, board, n):
        for i in range(row):
            if board[i][col] == "Q": return False
        for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
            if board[i][j] == "Q": return False
        for i, j in zip(range(row-1, -1, -1), range(col+1, n)):
            if board[i][j] == "Q": return False
        return True

    backtrack(0) # @viz:mainCall
    return res # @viz:return