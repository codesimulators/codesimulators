int leastInterval(vector<char>& tasks, int n) {
    int freq[26] = {};
    for (char t : tasks) {
        freq[t - 'A']++;
    }
    priority_queue<int> pq;
    for (int f : freq) {
        if (f > 0) {
            pq.push(f);
        }
    }
    int time = 0;
    while (!pq.empty()) {
        vector<int> temp;
        for (int i = 0; i <= n; i++) {
            if (!pq.empty()) {
                temp.push_back(pq.top() - 1);
                pq.pop();
            }
        }
        for (int t : temp) {
            if (t > 0) {
                pq.push(t);
            }
        }
        time += pq.empty() ? (int)temp.size() : n + 1;
    }
    return time;
}