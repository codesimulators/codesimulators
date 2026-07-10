def setZeroes(matrix):
    m, n = len(matrix), len(matrix[0])
    frz = any(matrix[0][c] == 0 for c in range(n))
    fcz = any(matrix[r][0] == 0 for r in range(m))
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][c] == 0:
                matrix[r][0] = matrix[0][c] = 0
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if fcz:
        for r in range(m): matrix[r][0] = 0
    if frz:
        for c in range(n): matrix[0][c] = 0
    return matrix