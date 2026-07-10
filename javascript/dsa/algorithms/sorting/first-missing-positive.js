function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; ) {
    const targetIdx = nums[i] - 1;
    if (nums[i] > 0 && nums[i] <= n && nums[targetIdx] !== nums[i]) {
      [nums[i], nums[targetIdx]] = [nums[targetIdx], nums[i]];
    } else {
      i++;
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
  return n + 1;
}