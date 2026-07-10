
function findRedundantConnection(edges) { // @viz:def
    const n = edges.length;
    const uf = new UnionFind(n + 1); // @viz:init

    for (const [u, v] of edges) { // @viz:loop_edges
        if (!uf.union(u, v)) { // @viz:check_cycle
            return [u, v]; // @viz:return_edge
        }
    }
    return []; // @viz:return_none
}

class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(i) {
        if (this.parent[i] === i) { // @viz:f_check
            return i; // @viz:f_return
        }
        // Path Compression
        this.parent[i] = this.find(this.parent[i]); // @viz:f_recurse
        return this.parent[i]; // @viz:f_return_node
    }

    union(i, j) {
        let rootI = this.find(i); // @viz:u_find_i
        let rootJ = this.find(j); // @viz:u_find_j
        
        if (rootI !== rootJ) { // @viz:u_check
            if (this.rank[rootI] > this.rank[rootJ]) { // @viz:u_rank_gt
                this.parent[rootJ] = rootI; // @viz:u_link_i
            } else if (this.rank[rootI] < this.rank[rootJ]) { // @viz:u_rank_lt
                this.parent[rootI] = rootJ; // @viz:u_link_j
            } else { // @viz:u_rank_eq
                this.parent[rootJ] = rootI; // @viz:u_link_same
                this.rank[rootI]++; // @viz:u_rank_inc
            }
            return true; // @viz:u_return_true
        }
        return false; // @viz:u_return_false
    }
}
