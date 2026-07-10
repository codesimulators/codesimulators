public int firstMissingPositive(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n; ) {
        int targetIdx = nums[i] - 1;
        if (nums[i] > 0 && nums[i] <= n && nums[targetIdx] != nums[i]) {
            int temp = nums[i];
            nums[i] = nums[targetIdx];
            nums[targetIdx] = temp;
        } else {
            i++;
        }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) {
            return i + 1;
        }
    }
    return n + 1;
}