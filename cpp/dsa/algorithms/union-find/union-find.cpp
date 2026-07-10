class UnionFind { // @viz: def
public:
    vector<int> parent;
    vector<int> rank;

    UnionFind(int n) {
        parent.resize(n); // @viz: init
        rank.resize(n, 0);
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int i) {
        if (parent[i] == i) { // @viz: f_check
            return i; // @viz: f_return
        }
        // Path Compression
        return parent[i] = find(parent[i]); // @viz: f_recurse
    }

    void unite(int i, int j) {
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
};