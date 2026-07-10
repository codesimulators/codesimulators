class Solution {
public:
    int findCelebrity(vector<vector<int>>& M) {
        int n = M.size();
        stack<int> sPeople; // @viz: init_stack
        for (int personIdx = 0; personIdx < n; personIdx++) { // @viz: push_loop
            sPeople.push(personIdx); // @viz: push_all
        }
        
        while (sPeople.size() > 1) { // @viz: while_reduction
            int person1 = sPeople.top(); sPeople.pop(); // @viz: pop_a
            int person2 = sPeople.top(); sPeople.pop(); // @viz: pop_b
            
            if (knows(M, person1, person2)) { // @viz: check_knows
                sPeople.push(person2); // @viz: push_b_back
            } else {
                sPeople.push(person1); // @viz: push_a_back
            }
        }
        
        int potential = sPeople.top(); sPeople.pop(); // @viz: extract_candidate
        for (int otherPerson = 0; otherPerson < n; otherPerson++) { // @viz: verify_loop
            if (otherPerson != potential && (knows(M, potential, otherPerson) || !knows(M, otherPerson, potential))) { // @viz: verify_check
                return -1; // @viz: verify_fail
            }
        }
        return potential; // @viz: finish
    }

private:
    bool knows(vector<vector<int>>& M, int a, int b) {
        return M[a][b] == 1;
    }
};