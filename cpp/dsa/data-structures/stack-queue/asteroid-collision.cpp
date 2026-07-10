class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroidsValue) {
        vector<int> stack; // @viz: init_stack
        
        for (int asteroid : asteroidsValue) { // @viz: loop
            bool isDestroyed = false; // @viz: alive
            
            while (!isDestroyed && asteroid < 0 && !stack.empty() && stack.back() > 0) { // @viz: while_check
                int topAsteroid = stack.back(); // @viz: get_top
                
                if (abs(asteroid) > abs(topAsteroid)) { // @viz: check_greater
                    stack.pop_back(); // @viz: pop_top
                    continue; // @viz: continue_loop
                }
                
                if (abs(asteroid) == abs(topAsteroid)) { // @viz: check_equal
                    stack.pop_back(); // @viz: both_pop_top
                }
                
                isDestroyed = true; // @viz: ast_destroyed
            }
            
            if (!isDestroyed) { // @viz: check_alive
                stack.push_back(asteroid); // @viz: push_ast
            }
        }
        
        return stack; // @viz: finish
    }
}