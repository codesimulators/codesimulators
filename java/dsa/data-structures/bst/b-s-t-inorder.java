class TreeNode {
  int value;
  TreeNode left, right;
  TreeNode(int val) { this.value = val; }
}

public class BSTInorder {
  public void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    visit(node);
    inorder(node.right);
  }

  public static void main(String[] args) {
    TreeNode root = buildTree([]);
    new BSTInorder().inorder(root);
  }
}