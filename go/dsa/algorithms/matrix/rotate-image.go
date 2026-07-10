func rotate(mat [][]int) {
    n := len(mat)
    // 1. Transpose
    for i := 0; i < n; i++ {
        for j := i; j < n; j++ {
            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]
        }
    }
    // 2. Reverse rows
    for i := 0; i < n; i++ {
        left, right := 0, n-1
        for left < right {
            mat[i][left], mat[i][right] = mat[i][right], mat[i][left]
            left++; right--
        }
    }
}