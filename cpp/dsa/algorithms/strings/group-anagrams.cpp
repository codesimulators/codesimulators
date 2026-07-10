vector<vector<string>> groupAnagrams(vector<string>& strs) {
  unordered_map<string, vector<string>> mp;
  
  for (string s : strs) {
    vector<int> freq(26, 0);
    for (char c : s) {
      freq[c - 'a']++;
    }
    
    string key = "";
    for (int i = 0; i < 26; i++) {
      if (freq[i] > 0) {
        key += (char)('a' + i) + to_string(freq[i]);
      }
    }
    
    if (mp.find(key) == mp.end()) {
      mp[key] = {};
    }
    mp[key].push_back(s);
  }
  
  return resultFromMap(mp);
}