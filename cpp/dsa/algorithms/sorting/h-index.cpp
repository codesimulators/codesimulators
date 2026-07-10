int hIndex(vector<int>& citations) {
    int n = citations.size();
    vector<int> buckets(n + 1, 0);
    
    for (int c : citations) {
        if (c >= n) {
            buckets[n]++;
        } else {
            buckets[c]++;
        }
    }
    
    int papersSeen = 0;
    for (int h = n; h >= 0; h--) {
        papersSeen += buckets[h];
        if (papersSeen >= h) {
            return h;
        }
    }
    return 0;
}