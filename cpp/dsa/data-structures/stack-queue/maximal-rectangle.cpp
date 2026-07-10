int maximalRectangle(vector<vector<char>>& matrix) {
    if (matrix.empty()) return 0; // @viz: check_empty
    int nRow = matrix.size(); // @viz: init_rows
    int nCol = matrix[0].size(); // @viz: init_cols
    vector<int> hList(nCol, 0); // @viz: init_heights
    int maxRect = 0; // @viz: init_max

    for (int r = 0; r < nRow; r++) { // @viz: row_loop
        for (int c = 0; c < nCol; c++) { // @viz: col_loop
            hList[c] = (matrix[r][c] == '1') ? hList[c] + 1 : 0; // @viz: update_height
        }
        maxRect = max(maxRect, largestHist(hList)); // @viz: compute_histogram
    }
    return maxRect; // @viz: finish
}

int largestHist(vector<int> heightsVec) {
    stack<int> s; // @viz: hist_init_stack
    int resArea = 0; // @viz: hist_init_max
    heightsVec.push_back(0); // @viz: hist_add_sentinel
    
    for (int i = 0; i < heightsVec.size(); i++) { // @viz: hist_loop
        while (!s.empty() && heightsVec[i] < heightsVec[s.top()]) { // @viz: hist_while_check
            int h = heightsVec[s.top()]; // @viz: hist_pop
            s.pop();
            int w = s.empty() ? i : i - s.top() - 1; // @viz: hist_width
            resArea = max(resArea, h * w); // @viz: hist_update_max
        }
        s.push(i); // @viz: hist_push
    }
    return resArea; // @viz: hist_finish
}