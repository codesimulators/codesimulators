def maximalRectangle(matrixValues):
    if not matrixValues: return 0 # @viz: check_empty
    
    rowsLen = len(matrixValues) # @viz: init_rows
    colsLen = len(matrixValues[0]) # @viz: init_cols
    currHeights = [0] * colsLen # @viz: init_heights
    resArea = 0 # @viz: init_max
    
    for r in range(rowsLen): # @viz: row_loop
        for c in range(colsLen): # @viz: col_loop
            currHeights[c] = currHeights[c] + 1 if matrixValues[r][c] == '1' else 0 # @viz: update_height
        
        resArea = max(resArea, computeHistogram(currHeights)) # @viz: compute_histogram
        
    return resArea # @viz: finish

def computeHistogram(hArr):
    s = [] # @viz: hist_init_stack
    m = 0 # @viz: hist_init_max
    h = hArr + [0] # @viz: hist_add_sentinel
    
    for i in range(len(h)): # @viz: hist_loop
        while s and h[i] < h[s[-1]]: # @viz: hist_while_check
            valH = h[s.pop()] # @viz: hist_pop
            valW = i if not s else i - s[-1] - 1 # @viz: hist_width
            m = max(m, valH * valW) # @viz: hist_update_max
        s.append(i) # @viz: hist_push
        
    return m # @viz: hist_finish