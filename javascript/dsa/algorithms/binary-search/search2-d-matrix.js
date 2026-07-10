function searchMatrix(matrix, target) {
    if (!matrix.length || !matrix[0].length) {
        return false;
    }
    
    let m = matrix.length;
    let n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        let row = Math.floor(mid / n);
        let col = mid % n;
        let val = matrix[row][col];

        if (val === target) {
            return true;
        }
        
        if (val < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}