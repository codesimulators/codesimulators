class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]): # @viz: init
        self.stack = [] 
        for i in range(len(nestedList) - 1, -1, -1): # @viz: init_loop
            self.stack.append(nestedList[i]) # @viz: init_push
        
    def next(self) -> int: # @viz: next_start
        return self.stack.pop().getInteger() # @viz: next_pop
        
    def hasNext(self) -> bool: # @viz: has_next_start
        while self.stack: # @viz: has_next_loop
            top = self.stack[-1] # @viz: has_next_peek
            if top.isInteger(): # @viz: has_next_check
                return True # @viz: has_next_return
            self.stack.pop() # @viz: has_next_pop
            for i in range(len(top.getList()) - 1, -1, -1): # @viz: flatten_loop
                self.stack.append(top.getList()[i]) # @viz: flatten_push
        return False # @viz: has_next_fail # @viz: finish