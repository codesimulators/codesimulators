function productExceptSelf(nums) {
    const n = nums.length;
    // 1️⃣ Initialize result array with 1s
    const res = new Array(n).fill(1);
    
    // 2️⃣ First pass: Calculate prefix products
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    
    // 3️⃣ Second pass: Calculate suffix products
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}