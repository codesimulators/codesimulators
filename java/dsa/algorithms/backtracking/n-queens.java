class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>(); // @viz:init
        char[][] board = new char[n][n]; // @viz:init
        for(char[] r : board) Arrays.fill(r, '.'); // @viz:init
        backtrack(0, board, n, res); // @viz:mainCall
        return res; // @viz:return
    }

    private void backtrack(int row, char[][] board, int n, List<List<String>> res) {
        if (row == n) { // @viz:baseCheck
            res.add(construct(board)); // @viz:baseAdd
            return; // @viz:baseReturn
        }

        for (int col = 0; col < n; col++) { // @viz:loop
            if (isSafe(row, col, board, n)) { // @viz:validCheck
                board[row][col] = 'Q'; // @viz:place
                backtrack(row + 1, board, n, res); // @viz:recurse
                board[row][col] = '.'; // @viz:backtrack
            }
        }
    }

    private boolean isSafe(int row, int col, char[][] board, int n) {
        for (int i = 0; i < row; i++) if (board[i][col] == 'Q') return false;
        for (int i = row-1, j = col-1; i>=0 && j>=0; i--, j--) if (board[i][j] == 'Q') return false;
        for (int i = row-1, j = col+1; i>=0 && j<n; i--, j++) if (board[i][j] == 'Q') return false;
        return true;
    }
}