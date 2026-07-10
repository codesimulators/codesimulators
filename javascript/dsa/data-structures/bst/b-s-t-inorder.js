class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function inorder(node) {
  if (!node) return;
  inorder(node.left);
  visit(node);
  inorder(node.right);
}

// Main execution
const root = buildTree([]);
inorder(root);