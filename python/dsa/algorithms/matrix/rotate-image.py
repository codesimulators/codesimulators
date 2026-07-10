def rotate(mat):
    n = len(mat)
    # 1. Transpose
    for i in range(n):
        for j in range(i, n):
            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]
    # 2. Reverse rows
    for i in range(n):
        left, right = 0, n - 1
        while left < right:
            mat[i][left], mat[i][right] = mat[i][right], mat[i][left]
            left, right = left + 1, right - 1
    return mat