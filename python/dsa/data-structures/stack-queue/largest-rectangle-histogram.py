def largestRectangleArea(heights: List[int]) -> int:
    s = [] # @viz: init_stack
    max_area = 0 # @viz: init_max
    h = heights + [0] # @viz: add_sentinel
    
    for i in range(len(h)): # @viz: loop
        while s and h[i] < h[s[-1]]: # @viz: while_check
            height = h[s.pop()] # @viz: pop
            width = i if not s else i - s[-1] - 1 # @viz: width
            max_area = max(max_area, height * width) # @viz: update_max
        s.append(i) # @viz: push
        
    return max_area # @viz: finish