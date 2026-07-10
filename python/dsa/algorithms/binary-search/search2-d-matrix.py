def search_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
    
    m = len(matrix)
    n = len(matrix[0])
    left = 0
    right = m * n - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        row = mid // n
        col = mid % n
        val = matrix[row][col]
        
        if val == target:
            return True
        
        if val < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return False