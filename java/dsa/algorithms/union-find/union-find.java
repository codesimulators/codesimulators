class UnionFind { // @viz: def
    int[] parent;
    int[] rank;

    public UnionFind(int n) {
        parent = new int[n]; // @viz: init
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    public int find(int i) {
        if (parent[i] == i) { // @viz: f_check
            return i; // @viz: f_return
        }
        // Path Compression
        parent[i] = find(parent[i]); // @viz: f_recurse
        return parent[i]; // @viz: f_return_node
    }

    public void union(int i, int j) {
        int rootI = find(i); // @viz: u_find_i
        int rootJ = find(j); // @viz: u_find_j
        
        if (rootI != rootJ) { // @viz: u_check
            if (rank[rootI] > rank[rootJ]) { // @viz: u_rank_gt
                parent[rootJ] = rootI; // @viz: u_link_i
            } else if (rank[rootI] < rank[rootJ]) { // @viz: u_rank_lt
                parent[rootI] = rootJ; // @viz: u_link_j
            } else { // @viz: u_rank_eq
                parent[rootJ] = rootI; // @viz: u_link_same
                rank[rootI]++; // @viz: u_rank_inc
            }
        }
    }
}