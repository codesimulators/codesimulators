public int[] topoSortDFS(int V, List<List<Integer>> adj) { // @viz:def
    Set<Integer> visited = new HashSet<>(); // @viz:init
    Stack<Integer> stack = new Stack<>(); // @viz:stack_init
    
    for (int i = 0; i < V; i++) { // @viz:loop
        if (!visited.contains(i)) { // @viz:dfs_call
            dfs(i, adj, visited, stack);
        }
    }
    
    int[] res = new int[V];
    for (int i = 0; i < V; i++) res[i] = stack.pop(); // @viz:ret
    return res;
}

void dfs(int u, List<List<Integer>> adj, Set<Integer> visited, Stack<Integer> stack) { // @viz:dfs_def
    visited.add(u); // @viz:dfs_mark
    for (int v : adj.get(u)) { // @viz:dfs_for
        if (!visited.contains(v)) dfs(v, adj, visited, stack); // @viz:dfs_recurse
    }
    stack.push(u); // @viz:dfs_push
}