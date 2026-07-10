class TreeNode {
  int value;
  TreeNode left, right;
  TreeNode(int val) { this.value = val; }
}

public class BSTSearch {
  public TreeNode search(TreeNode root, int val) {
    if (root == null) return null;
    if (root.value == val) return root;
    if (val < root.value) {
      return search(root.left, val);
    }
    return search(root.right, val);
  }

  public static void main(String[] args) {
    TreeNode root = buildTree([]);
    new BSTSearch().search(root, 0,0);
  }
}