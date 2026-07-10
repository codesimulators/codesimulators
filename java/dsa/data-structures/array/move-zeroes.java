public void moveZeroes(int[] nums) {
    int lastNonZeroAt = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            int temp = nums[i];
            nums[i] = nums[lastNonZeroAt];
            nums[lastNonZeroAt] = temp;
            lastNonZeroAt++;
        }
    }
}