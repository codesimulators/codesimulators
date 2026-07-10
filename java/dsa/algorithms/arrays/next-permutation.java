class Solution {
    public void nextPermutation(int[] nums) {
        // 1. Find pivot
        int pivot = nums.length - 2;
        while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) {
            pivot--;
        }
        // 2. Find successor and swap
        if (pivot >= 0) {
            int successor = nums.length - 1;
            while (nums[successor] <= nums[pivot]) {
                successor--;
            }
            swap(nums, pivot, successor);
        }
        // 3. Reverse suffix
        reverse(nums, pivot + 1, nums.length - 1);
    }
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            swap(nums, left++, right--);
        }
    }
}