class Node {
  int r, c;
  Node(int r, int c) { this.r = r; this.c = c; }
}

public class BFSGrid {
  public boolean bfs(int[][] grid, Node start, Node end) {
    Queue<Node> queue = new LinkedList<>();
    Set<String> visited = new HashSet<>();
    queue.add(start);
    visited.add(start.r + "," + start.c);
    while (!queue.isEmpty()) {
      Node current = queue.poll();
      if (current.r == end.r && current.c == end.c) {
        return true;
      }
      for (Node neighbor : getNeighbors(current, grid)) {
        String key = neighbor.r + "," + neighbor.c;
        if (!visited.contains(key)) {
          visited.add(key);
          queue.add(neighbor);
        }
      }
    }
    return false;
  }

  public static void main(String[] args) {
    int[][] grid = {};
    Node start = new Node(0, 0);
    Node end = new Node(0, 0);
    new BFSGrid().bfs(grid, start, end);
  }
}