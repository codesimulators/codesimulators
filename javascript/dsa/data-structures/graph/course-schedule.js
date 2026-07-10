function canFinish(numCourses, prerequisites) { // @viz: def
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [v, u] of prerequisites) adj[u].push(v);

    const visited = new Int8Array(numCourses); // 0: unvisited, 1: visiting, 2: visited

    function hasCycle(u) {
        if (visited[u] === 1) return true; // @viz: dfs_cycle
        if (visited[u] === 2) return false;

        visited[u] = 1; // @viz: dfs_mark
        for (const v of adj[u]) { // @viz: dfs_for
            if (hasCycle(v)) return true; // @viz: dfs_recurse
        }
        visited[u] = 2; // @viz: dfs_push
        return false;
    }

    for (let i = 0; i < numCourses; i++) { // @viz: loop
        if (hasCycle(i)) return false;
    }
    return true; // @viz: ret
}