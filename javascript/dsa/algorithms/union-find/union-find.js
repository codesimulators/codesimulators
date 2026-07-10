class UnionFind { // @viz: def
  constructor(n) {
    this.parent = Array(n).fill(0).map((_, i) => i); // @viz: init
    this.rank = Array(n).fill(0);
  }

  find(i) {
    if (this.parent[i] === i) { // @viz: f_check
      return i; // @viz: f_return
    }
    // Path Compression
    this.parent[i] = this.find(this.parent[i]); // @viz: f_recurse
    return this.parent[i]; // @viz: f_return_node
  }

  union(i, j) {
    let rootI = this.find(i); // @viz: u_find_i
    let rootJ = this.find(j); // @viz: u_find_j
    
    if (rootI !== rootJ) { // @viz: u_check
      if (this.rank[rootI] > this.rank[rootJ]) { // @viz: u_rank_gt
        this.parent[rootJ] = rootI; // @viz: u_link_i
      } else if (this.rank[rootI] < this.rank[rootJ]) { // @viz: u_rank_lt
        this.parent[rootI] = rootJ; // @viz: u_link_j
      } else { // @viz: u_rank_eq
        this.parent[rootJ] = rootI; // @viz: u_link_same
        this.rank[rootI]++; // @viz: u_rank_inc
      }
    }
  }
}