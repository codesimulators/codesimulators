vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;
    int left = 0;

    for (int right = 0; right < nums.size(); right++) {
        // 1. Expand
        while (!dq.empty() && nums[dq.back()] <= nums[right]) {
            dq.pop_back();
        }
        dq.push_back(right);

        // 2. Condition
        if (right - left + 1 == k) {
            // 3. Record
            res.push_back(nums[dq.front()]);

            // 4. Slide
            if (dq.front() == left) {
                dq.pop_front();
            }
            left++;
        }
    }
    return res;
}