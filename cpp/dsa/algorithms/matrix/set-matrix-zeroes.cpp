class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool frz = false, fcz = false;
        for(int r=0; r<m; r++) if(matrix[r][0] == 0) fcz = true;
        for(int c=0; c<n; c++) if(matrix[0][c] == 0) frz = true;
        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                if (matrix[r][c] == 0) {
                    matrix[r][0] = 0; matrix[0][c] = 0;
                }
            }
        }
        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                if (matrix[r][0] == 0 || matrix[0][c] == 0)
                    matrix[r][c] = 0;
            }
        }
        if (fcz)
            for (int r = 0; r < m; r++) matrix[r][0] = 0;
        if (frz)
            for (int c = 0; c < n; c++) matrix[0][c] = 0;
    }
};