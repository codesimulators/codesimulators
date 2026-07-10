vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;
    int left = 0;

    for (int right = 0; right < nums.size(); right++) {
        // 1️⃣ Expand: Maintain monotonic property
        while (!dq.empty() && nums[dq.back()] <= nums[right]) {
            dq.pop_back();
        }
        dq.push_back(right);

        // 2️⃣ When window size reaches k
        if (right - left + 1 == k) {
            // 3️⃣ Record / Evaluate
            res.push_back(nums[dq.front()]);

            // 4️⃣ Slide window
            if (dq.front() == left) dq.pop_front();
            left++;
        }
    }
    return res;
}