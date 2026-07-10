class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0;
        int high = nums.length - 1;
        while (mid <= high) {
            // 1️⃣ Inspect: What color is at mid?
            if (nums[mid] == 0) {
                // 2️⃣ Red → swap to front
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++; mid++;
            } else if (nums[mid] == 1) {
                // 3️⃣ White → already in place
                mid++;
            } else {
                // 4️⃣ Blue → swap to back
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }
}