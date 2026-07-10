class Node {
  constructor(r, c) {
    this.r = r;
    this.c = c;
  }
}

function bfs(grid, start, end) {
  let queue = [start];
  let visited = new Set([`${start.r},${start.c}`]);
  while (queue.length > 0) {
    let current = queue.shift();
    if (current.r === end.r && current.c === end.c) {
      return true;
    }
    for (let neighbor of getNeighbors(current, grid)) {
      let key = `${neighbor.r},${neighbor.c}`;
      if (!visited.has(key)) {
        visited.add(key);
        queue.push(neighbor);
      }
    }
  }
  return false;
}

// Main execution
const grid = [];
const start = new Node(0, 0);
const end = new Node(0, 0);
bfs(grid, start, end);