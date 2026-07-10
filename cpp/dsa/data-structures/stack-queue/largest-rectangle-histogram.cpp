class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st; // @viz: init_stack
        int maxArea = 0; // @viz: init_max
        vector<int> h = heights;
        h.push_back(0); // @viz: add_sentinel
        
        for (int i = 0; i < h.size(); i++) { // @viz: loop
            while (!st.empty() && h[i] < h[st.top()]) { // @viz: while_check
                int height = h[st.top()]; // @viz: pop
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1; // @viz: width
                maxArea = max(maxArea, height * width); // @viz: update_max
            }
            st.push(i); // @viz: push
        }
        return maxArea; // @viz: finish
    }
};