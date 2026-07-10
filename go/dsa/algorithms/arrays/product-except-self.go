func productExceptSelf(nums []int) []int {
    n := len(nums)
    // 1️⃣ Initialize result array
    res := make([]int, n)
    
    // 2️⃣ First pass: Calculate prefix products
    prefix := 1
    for i := 0; i < n; i++ {
        res[i] = prefix
        prefix *= nums[i]
    }
    
    // 3️⃣ Second pass: Calculate suffix products
    suffix := 1
    for i := n - 1; i >= 0; i-- {
        res[i] *= suffix
        suffix *= nums[i]
    }
    return res
}