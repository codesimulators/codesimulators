
public int[] findRedundantConnection(int[][] edges) { // @viz:def
    int n = edges.length;
    UnionFind uf = new UnionFind(n + 1); // @viz:init
    
    for (int[] edge : edges) { // @viz:loop_edges
        int u = edge[0];
        int v = edge[1];
        if (!uf.union(u, v)) { // @viz:check_cycle
            return edge; // @viz:return_edge
        }
    }
    return new int[0]; // @viz:return_none
}

class UnionFind {
    int[] parent;
    int[] rank;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    public int find(int i) {
        if (parent[i] == i) { // @viz:f_check
            return i; // @viz:f_return
        }
        return parent[i] = find(parent[i]); // @viz:f_recurse
    }
    
    public boolean union(int i, int j) {
        int rootI = find(i); // @viz:u_find_i
        int rootJ = find(j); // @viz:u_find_j
        if (rootI != rootJ) { // @viz:u_check
            if (rank[rootI] > rank[rootJ]) { // @viz:u_rank_gt
                parent[rootJ] = rootI; // @viz:u_link_i
            } else if (rank[rootI] < rank[rootJ]) { // @viz:u_rank_lt
                parent[rootI] = rootJ; // @viz:u_link_j
            } else { // @viz:u_rank_eq
                parent[rootJ] = rootI; // @viz:u_link_same
                rank[rootI]++; // @viz:u_rank_inc
            }
            return true; // @viz:u_return_true
        }
        return false; // @viz:u_return_false
    }
}
