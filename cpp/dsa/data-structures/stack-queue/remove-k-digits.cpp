class Solution {
public:
    string removeKdigits(string numString, int kValue) {
        string resContainer = ""; // @viz: init_stack
        
        for (char digit : numString) { // @viz: loop
            while (kValue > 0 && !resContainer.empty() && resContainer.back() > digit) { // @viz: while_check
                resContainer.pop_back(); // @viz: pop
                kValue--; // @viz: dec_k
            }
            resContainer.push_back(digit); // @viz: push
        }
        
        while (kValue > 0) { // @viz: trim_check
            resContainer.pop_back(); // @viz: pop_trim
            kValue--; // @viz: dec_k_trim
        }
        
        size_t firstIdx = resContainer.find_first_not_of('0'); // @viz: join
        if (firstIdx == string::npos) return "0"; // @viz: finish
        return resContainer.substr(firstIdx);
    }
}