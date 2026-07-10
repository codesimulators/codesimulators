string frequencySort(string s) {
    unordered_map<char, int> counts;
    for (char c : s) counts[c]++;
    
    int n = s.length();
    vector<vector<char>> buckets(n + 1);
    for (auto& it : counts) {
        buckets[it.second].push_back(it.first);
    }
    
    string res = "";
    for (int f = n; f >= 1; f--) {
        for (char c : buckets[f]) {
            res.append(f, c);
        }
    }
    return res;
}