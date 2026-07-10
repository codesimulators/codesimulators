class Node:
    def __init__(self, r, c):
        self.r = r
        self.c = c

def bfs(grid, start, end):
    queue = collections.deque([start])
    visited = {(start.r, start.c)}
    while queue:
        curr = queue.popleft()
        if curr.r == end.r and curr.c == end.c:
            return True
        for nb in get_neighbors(curr, grid):
            if (nb.r, nb.c) not in visited:
                visited.add((nb.r, nb.c))
                queue.append(nb)
    return False

# Main execution
grid = []
start = Node(0, 0)
end = Node(0, 0)
bfs(grid, start, end)