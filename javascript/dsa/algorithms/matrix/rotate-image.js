function rotate(mat) {
    const n = mat.length;
    // 1. Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [mat[i][j], mat[j][i]] = [mat[j][i], mat[i][j]];
        }
    }
    // 2. Reverse each row
    for (let i = 0; i < n; i++) {
        let left = 0, right = n - 1;
        while (left < right) {
            [mat[i][left], mat[i][right]] = [mat[i][right], mat[i][left]];
            left++; right--;
        }
    }
}