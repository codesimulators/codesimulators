func searchMatrix(matrix [][]int, target int) bool {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return false
    }

    m := len(matrix)
    n := len(matrix[0])
    left, right := 0, m*n - 1

    for left <= right {
        mid := left + (right - left) / 2
        row := mid / n
        col := mid % n
        val := matrix[row][col]

        if val == target {
            return true
        }
        
        if val < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return false
}