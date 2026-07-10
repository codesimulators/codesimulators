class Solution {
public:
    string simplifyPath(string pathString) {
        vector<string> stack; // @viz: init
        stringstream ss(pathString); // @viz: split
        string part;
        
        while (getline(ss, part, '/')) { // @viz: loop
            if (part == "." || part == "") { // @viz: check_skip
                continue; // @viz: skip
            }
            
            if (part == "..") { // @viz: check_parent
                if (!stack.empty()) { // @viz: check_pop
                    stack.pop_back(); // @viz: pop
                }
            } else {
                stack.push_back(part); // @viz: push
            }
        }
        
        string res = "";
        for (string s : stack) res += "/" + s;
        return res.empty() ? "/" : res; // @viz: finish
    }
}