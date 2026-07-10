type UnionFind struct { // @viz: def
    parent []int
    rank   []int
}

func NewUnionFind(n int) *UnionFind {
    parent := make([]int, n) // @viz: init
    rank := make([]int, n)
    for i := range parent { parent[i] = i }
    return &UnionFind{parent, rank}
}

func (uf *UnionFind) Find(i int) int {
    if uf.parent[i] == i { // @viz: f_check
        return i // @viz: f_return
    }
    // Path Compression
    uf.parent[i] = uf.Find(uf.parent[i]) // @viz: f_recurse
    return uf.parent[i] // @viz: f_return_node
}

func (uf *UnionFind) Union(i, j int) {
    rootI := uf.Find(i) // @viz: u_find_i
    rootJ := uf.Find(j) // @viz: u_find_j
    
    if rootI != rootJ { // @viz: u_check
        if uf.rank[rootI] > uf.rank[rootJ] { // @viz: u_rank_gt
            uf.parent[rootJ] = rootI // @viz: u_link_i
        } else if uf.rank[rootI] < uf.rank[rootJ] { // @viz: u_rank_lt
            uf.parent[rootI] = rootJ // @viz: u_link_j
        } else { // @viz: u_rank_eq
            uf.parent[rootJ] = rootI // @viz: u_link_same
            uf.rank[rootI]++ // @viz: u_rank_inc
        }
    }
}