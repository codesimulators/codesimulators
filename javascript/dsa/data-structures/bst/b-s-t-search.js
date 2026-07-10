class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function search(node, target) {
  if (!node) return null;
  if (node.value === target) return node;
  if (target < node.value) {
    return search(node.left, target);
  } else {
    return search(node.right, target);
  }
}

// Main execution
const root = buildTree([]);
search(root, 0,0);