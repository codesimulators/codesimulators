function moveZeroes(nums) {
  let lastNonZeroAt = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let temp = nums[i];
      nums[i] = nums[lastNonZeroAt];
      nums[lastNonZeroAt] = temp;
      lastNonZeroAt++;
    }
  }
}