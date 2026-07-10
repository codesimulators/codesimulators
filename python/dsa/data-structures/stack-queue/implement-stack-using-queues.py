class MyStack:
    def __init__(self):
        self.queueData = collections.deque()

    def push(self, x: int) -> None: # @viz: push_start
        self.queueData.append(x) # @viz: push_val
        for _ in range(len(self.queueData) - 1): # @viz: loop @viz: push_end
            val = self.queueData.popleft() # @viz: rotate_pop
            self.queueData.append(val) # @viz: rotate_push

    def pop(self) -> int: # @viz: pop_start
        return self.queueData.popleft() # @viz: pop_val @viz: pop_end

    def top(self) -> int: # @viz: top_start
        return self.queueData[0] # @viz: top_val @viz: top_end

    def empty(self) -> bool: # @viz: empty_start
        return not self.queueData # @viz: empty_check