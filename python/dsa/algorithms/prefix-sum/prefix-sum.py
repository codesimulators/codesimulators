class Solution:
    def runningSum(self, nums):
        if not nums:
            return []

        prefix = [0] * len(nums)
        prefix[0] = nums[0]
        for i in range(1, len(nums)):
            prefix[i] = prefix[i - 1] + nums[i]

        return prefix