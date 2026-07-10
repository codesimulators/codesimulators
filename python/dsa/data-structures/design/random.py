class RandomizedSet:
    def __init__(self): # @viz:init
        self.nums = []
        self.val_to_index = {}

    def insert(self, val: int) -> bool: # @viz:insert_start
        if val in self.val_to_index: # @viz:insert_check
            return False # @viz:insert_exists
        
        self.val_to_index[val] = len(self.nums) # @viz:insert_map
        self.nums.append(val) # @viz:insert_list
        return True # @viz:insert_done

    def remove(self, val: int) -> bool: # @viz:remove_start
        if val not in self.val_to_index: # @viz:remove_check
            return False # @viz:remove_not_found
        
        idx = self.val_to_index[val] # @viz:remove_get_index
        last_val = self.nums[-1]
        
        # Move last element to the gap
        self.nums[idx] = last_val # @viz:remove_swap
        self.val_to_index[last_val] = idx # @viz:remove_update_map
        
        # Remove last element
        self.nums.pop() # @viz:remove_pop
        del self.val_to_index[val] # @viz:remove_delete_map
        
        return True # @viz:remove_done

    def getRandom(self) -> int: # @viz:random_start
        return random.choice(self.nums) # @viz:random_pick
        # @viz:random_done