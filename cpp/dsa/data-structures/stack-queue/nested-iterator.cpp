class NestedIterator {
public:
    stack<NestedInteger> st;
    NestedIterator(vector<NestedInteger> &nestedList) { // @viz: init
        for (int i = nestedList.size() - 1; i >= 0; i--) { // @viz: init_loop
            st.push(nestedList[i]); // @viz: init_push
        }
    }
    
    int next() { // @viz: next_start
        int res = st.top().getInteger(); // @viz: next_pop
        st.pop();
        return res;
    }
    
    bool hasNext() { // @viz: has_next_start
        while (!st.empty()) { // @viz: has_next_loop
            if (st.top().isInteger()) // @viz: has_next_check
                return true; // @viz: has_next_return
            vector<NestedInteger> list = st.top().getList(); // @viz: has_next_peek
            st.pop(); // @viz: has_next_pop
            for (int i = list.size() - 1; i >= 0; i--) { // @viz: flatten_loop
                st.push(list[i]); // @viz: flatten_push
            }
        }
        return false; // @viz: has_next_fail
    }
}; // @viz: finish