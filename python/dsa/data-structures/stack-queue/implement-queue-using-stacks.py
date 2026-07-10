class MyQueue:
    def __init__(self):
        self.inStack = []
        self.outStack = []

    def push(self, x: int) -> None: # @viz: push_start
        self.inStack.append(x) # @viz: push_val @viz: push_end

    def pop(self) -> int: # @viz: pop_start
        self.peek() # @viz: pop_peek
        return self.outStack.pop() # @viz: pop_val @viz: pop_end

    def peek(self) -> int: # @viz: peek_start
        if not self.outStack: # @viz: peek_check
            while self.inStack: # @viz: move_loop
                val = self.inStack.pop() # @viz: move_pop
                self.outStack.append(val) # @viz: move_push
        return self.outStack[-1] # @viz: peek_val @viz: peek_end

    def empty(self) -> bool: # @viz: empty_start
        return not self.inStack and not self.outStack # @viz: empty_check