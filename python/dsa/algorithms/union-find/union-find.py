class UnionFind: # @viz: def
    def __init__(self, n):
        self.parent = list(range(n)) # @viz: init
        self.rank = [0] * n

    def find(self, i):
        if self.parent[i] == i: # @viz: f_check
            return i # @viz: f_return
        
        # Path Compression
        self.parent[i] = self.find(self.parent[i]) # @viz: f_recurse
        return self.parent[i] # @viz: f_return_node

    def union(self, i, j):
        root_i = self.find(i) # @viz: u_find_i
        root_j = self.find(j) # @viz: u_find_j
        
        if root_i != root_j: # @viz: u_check
            if self.rank[root_i] > self.rank[root_j]: # @viz: u_rank_gt
                self.parent[root_j] = root_i # @viz: u_link_i
            elif self.rank[root_i] < self.rank[root_j]: # @viz: u_rank_lt
                self.parent[root_i] = root_j # @viz: u_link_j
            else: # @viz: u_rank_eq
                self.parent[root_j] = root_i # @viz: u_link_same
                self.rank[root_i] += 1 # @viz: u_rank_inc