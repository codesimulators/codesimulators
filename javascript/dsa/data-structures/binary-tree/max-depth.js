/** Definition for a binary tree node */
// class TreeNode {
//     val, left, right
// }

function maxDepth(node) { // @viz: function_start
  if (!node) return 0; // @viz: base_case
  const left = maxDepth(node.left); // @viz: recurse_left
  const right = maxDepth(node.right); // @viz: recurse_right
  return Math.max(left, right) + 1; // @viz: return_result
} // @viz: RESULT