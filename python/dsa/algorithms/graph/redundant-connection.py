
def findRedundantConnection(edges: List[List[int]]) -> List[int]: # @viz:def
    n = len(edges)
    uf = UnionFind(n + 1) # @viz:init
    
    for u, v in edges: # @viz:loop_edges
        if not uf.union(u, v): # @viz:check_cycle
            return [u, v] # @viz:return_edge
            
    return [] # @viz:return_none

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
            return True # @viz:u_return_true
        return False # @viz:u_return_false
