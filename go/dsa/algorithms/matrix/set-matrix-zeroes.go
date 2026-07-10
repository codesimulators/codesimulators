func setZeroes(matrix [][]int) {
    m, n := len(matrix), len(matrix[0])
    frz, fcz := false, false
    for r := 0; r < m; r++ { if matrix[r][0] == 0 { fcz = true } }
    for c := 0; c < n; c++ { if matrix[0][c] == 0 { frz = true } }
    for r := 1; r < m; r++ {
        for c := 1; c < n; c++ {
            if matrix[r][c] == 0 {
                matrix[r][0] = 0
                matrix[0][c] = 0
            }
        }
    }
    for r := 1; r < m; r++ {
        for c := 1; c < n; c++ {
            if matrix[r][0] == 0 || matrix[0][c] == 0 {
                matrix[r][c] = 0
            }
        }
    }
    if fcz {
        for r := 0; r < m; r++ { matrix[r][0] = 0 }
    }
    if frz {
        for c := 0; c < n; c++ { matrix[0][c] = 0 }
    }
}