class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        // 1️⃣ Initialize result array
        int[] res = new int[n];
        
        // 2️⃣ First pass: Calculate prefix products
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        
        // 3️⃣ Second pass: Calculate suffix products
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
}