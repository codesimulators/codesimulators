class MinStack:
    def __init__(self): # @viz:init_stack
        self.dataStack = []
        self.minStack = [] # @viz:init_min

    def push(self, val: int) -> None: # @viz:push_start
        self.dataStack.append(val) # @viz:push_val
        if not self.minStack or val <= self.minStack[-1]: # @viz:min_check
            self.minStack.append(val) # @viz:min_push
        # @viz:push_end

    def pop(self) -> None: # @viz:pop_start
        popped = self.dataStack.pop() # @viz:pop_val
        if popped == self.minStack[-1]: # @viz:pop_min_check
            self.minStack.pop() # @viz:min_pop
        # @viz:pop_end

    def top(self) -> int: # @viz:top_start
        return self.dataStack[-1] # @viz:top_val

    def getMin(self) -> int: # @viz:get_min_start
        return self.minStack[-1] # @viz:min_val