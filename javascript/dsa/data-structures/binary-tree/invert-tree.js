/** Definition for a binary tree node */
// class TreeNode {
//     val, left, right
// }

function invertTree(root) { // @viz: entry
  if (!root) return null; // @viz: base_check

  // @viz: swap
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left); // @viz: recurse_left
  invertTree(root.right); // @viz: recurse_right

  return root; // @viz: return
} // @viz: return