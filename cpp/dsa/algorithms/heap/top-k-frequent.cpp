vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int,int> freq;
    for (int n : nums) {
        freq[n]++;
    }
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    for (auto& [num, cnt] : freq) {
        pq.push({cnt, num});
        if ((int)pq.size() > k) {
            pq.pop();
        }
    }
    vector<int> res;
    while (!pq.empty()) {
        res.push_back(pq.top().second); pq.pop();
    }
    return res;
}