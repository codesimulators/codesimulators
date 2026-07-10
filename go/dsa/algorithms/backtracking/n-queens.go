func solveNQueens(n int) [][]string {
    res := [][]string{} // @viz:init
    board := make([][]byte, n) // @viz:init
    for i := range board { board[i] = make([]byte, n); for j := range board[i] { board[i][j] = '.' } } // @viz:init

    var backtrack func(int)
    backtrack = func(row int) {
        if row == n { // @viz:baseCheck
            res = append(res, construct(board)) // @viz:baseAdd
            return // @viz:baseReturn
        }

        for col := 0; col < n; col++ { // @viz:loop
            if isSafe(row, col, board, n) { // @viz:validCheck
                board[row][col] = 'Q' // @viz:place
                backtrack(row + 1) // @viz:recurse
                board[row][col] = '.' // @viz:backtrack
            }
        }
    }

    var isSafe func(int, int, [][]byte, int) bool
    isSafe = func(row, col int, board [][]byte, n int) bool {
        for i := 0; i < row; i++ { if board[i][col] == 'Q' { return false } }
        for i, j := row-1, col-1; i >= 0 && j >= 0; i, j = i-1, j-1 { if board[i][j] == 'Q' { return false } }
        for i, j := row-1, col+1; i >= 0 && j < n; i, j = i-1, j+1 { if board[i][j] == 'Q' { return false } }
        return true
    }

    backtrack(0) // @viz:mainCall
    return res // @viz:return
}