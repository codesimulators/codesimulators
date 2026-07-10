
def findCircleNum(isConnected: List[List[int]]) -> int: # @viz:def
    n = len(isConnected)
    uf = UnionFind(n) # @viz:init
    province_count = n
    
    for i in range(n): # @viz:loop_i
        for j in range(i + 1, n): # @viz:loop_j
            if isConnected[i][j] == 1: # @viz:check_conn
                if uf.union(i, j): # @viz:u_call
                    province_count -= 1 # @viz:dec_count
                    
    return province_count # @viz:return

class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        
    def find(self, i):
        if self.parent[i] == i: # @viz:f_check
            return i # @viz:f_return
        # Path Compression
        self.parent[i] = self.find(self.parent[i]) # @viz:f_recurse
        return self.parent[i] # @viz:f_return_node
        
    def union(self, i, j):
        rootI = self.find(i) # @viz:u_find_i
        rootJ = self.find(j) # @viz:u_find_j
        if rootI != rootJ: # @viz:u_check
            if self.rank[rootI] > self.rank[rootJ]: # @viz:u_rank_gt
                self.parent[rootJ] = rootI # @viz:u_link_i
            elif self.rank[rootI] < self.rank[rootJ]: # @viz:u_rank_lt
                self.parent[rootI] = rootJ # @viz:u_link_j
            else: # @viz:u_rank_eq
                self.parent[rootJ] = rootI # @viz:u_link_same
                self.rank[rootI] += 1 # @viz:u_rank_inc
            return True
        return False
