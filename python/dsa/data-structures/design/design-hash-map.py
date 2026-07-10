class MyHashMap:
    def __init__(self): # @viz:init
        self.size = 8
        self.buckets = [[] for _ in range(self.size)]

    def _hash(self, key):
        return key % self.size

    def put(self, key: int, value: int) -> None: # @viz:put_start
        idx = self._hash(key) # @viz:hash
        bucket = self.buckets[idx] # @viz:put_bucket
        for i, (k, v) in enumerate(bucket): # @viz:check_exists
            if k == key: # @viz:check_key
                bucket[i][1] = value # @viz:update
                return # @viz:put_return
        bucket.append([key, value]) # @viz:insert

    def get(self, key: int) -> int: # @viz:get_start
        idx = self._hash(key) # @viz:get_hash
        bucket = self.buckets[idx] # @viz:get_bucket
        for k, v in bucket: # @viz:get_search
            if k == key: # @viz:get_check_key
                return v # @viz:get_found
        return -1 # @viz:get_not_found

    def remove(self, key: int) -> None: # @viz:remove_start
        idx = self._hash(key) # @viz:remove_hash
        bucket = self.buckets[idx] # @viz:remove_bucket
        for i, (k, v) in enumerate(bucket): # @viz:remove_search
            if k == key: # @viz:remove_check_key
                bucket.pop(i) # @viz:remove_done
                return # @viz:remove_return
        # Not found # @viz:remove_not_found

# Simulation end # @viz:finish