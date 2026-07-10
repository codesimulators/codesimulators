class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res; // @viz:init
        vector<string> board(n, string(n, '.')); // @viz:init
        backtrack(0, board, n, res); // @viz:mainCall
        return res; // @viz:return
    }

private:
    void backtrack(int row, vector<string>& board, int n, vector<vector<string>>& res) {
        if (row == n) { // @viz:baseCheck
            res.push_back(board); // @viz:baseAdd
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

    bool isSafe(int row, int col, vector<string>& board, int n) {
        for (int i = 0; i < row; i++) if (board[i][col] == 'Q') return false;
        for (int i = row-1, j = col-1; i>=0 && j>=0; i--, j--) if (board[i][j] == 'Q') return false;
        for (int i = row-1, j = col+1; i>=0 && j<n; i--, j++) if (board[i][j] == 'Q') return false;
        return true;
    }
};