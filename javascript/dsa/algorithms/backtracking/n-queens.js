function solveNQueens(n) {
    const res = []; // @viz:init
    const board = Array.from({length: n}, () => Array(n).fill('.')); // @viz:init

    function backtrack(row) {
        // 1️⃣ Base Case
        if (row === n) { // @viz:baseCheck
            res.push(board.map(r => r.join(''))); // @viz:baseAdd
            return; // @viz:baseReturn
        }

        // 2️⃣ Explore choices
        for (let col = 0; col < n; col++) { // @viz:loop
            if (isSafe(row, col, board, n)) { // @viz:validCheck
                board[row][col] = 'Q'; // @viz:place
                backtrack(row + 1); // @viz:recurse
                board[row][col] = '.'; // @viz:backtrack
            }
        }
    }

    function isSafe(row, col, board, n) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        // Check top-left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        // Check top-right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }

    backtrack(0); // @viz:mainCall
    return res; // @viz:return
}