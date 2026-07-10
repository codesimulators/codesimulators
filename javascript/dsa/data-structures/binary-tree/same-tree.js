/** Definition for a binary tree node */
// class TreeNode {
//     val, left, right
// }

function isSameTree(p, q) { // @viz: function_start
  if (!p && !q) { // @viz: base_both_null
    return true; // @viz: base_both_null
  }
  if (!p || !q || p.val !== q.val) { // @viz: base_mismatch
    return false; // @viz: base_mismatch
  }

  const leftResult = isSameTree(p.left, q.left); // @viz: recurse_left
  const rightResult = isSameTree(p.right, q.right); // @viz: recurse_right

  return leftResult && rightResult; // @viz: return_result
} // @viz: return_result