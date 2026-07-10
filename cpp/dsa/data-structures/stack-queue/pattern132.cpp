bool find132pattern(vector<int>& numbers) {
    int s3Val = INT_MIN; // @viz: init_s3
    stack<int> s; // @viz: init_stack
    
    for (int i = numbers.size() - 1; i >= 0; i--) { // @viz: loop
        if (numbers[i] < s3Val) { // @viz: check_132
            return true; // @viz: found
        }
        
        while (!s.empty() && numbers[i] > s.top()) { // @viz: while_reduction
            s3Val = s.top(); // @viz: update_s3
            s.pop();
        }
        
        s.push(numbers[i]); // @viz: push_s2
    }
    
    return false; // @viz: finish
}