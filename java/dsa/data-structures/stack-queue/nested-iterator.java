public class NestedIterator implements Iterator<Integer> {
    private Stack<NestedInteger> stack;

    public NestedIterator(List<NestedInteger> nestedList) { // @viz: init
        stack = new Stack<>();
        for (int i = nestedList.size() - 1; i >= 0; i--) { // @viz: init_loop
            stack.push(nestedList.get(i)); // @viz: init_push
        }
    }
 
    @Override
    public Integer next() { // @viz: next_start
        return stack.pop().getInteger(); // @viz: next_pop
    }
 
    @Override
    public boolean hasNext() { // @viz: has_next_start
        while (!stack.isEmpty()) { // @viz: has_next_loop
            NestedInteger curr = stack.peek(); // @viz: has_next_peek
            if (curr.isInteger()) // @viz: has_next_check
                return true; // @viz: has_next_return
            stack.pop(); // @viz: has_next_pop
            for (int i = curr.getList().size() - 1; i >= 0; i--) { // @viz: flatten_loop
                stack.push(curr.getList().get(i)); // @viz: flatten_push
            }
        }
        return false; // @viz: has_next_fail
    }
} // @viz: finish