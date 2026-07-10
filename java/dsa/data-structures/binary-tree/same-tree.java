/** Definition for a binary tree node */
// public class TreeNode {
//     int val; TreeNode left; TreeNode right;
// }

public boolean isSameTree(TreeNode p, TreeNode q) { // @viz: function_start
  if (p == null && q == null) { // @viz: base_both_null
    return true; // @viz: base_both_null
  }
  if (p == null || q == null || p.val != q.val) { // @viz: base_mismatch
    return false; // @viz: base_mismatch
  }

  boolean left = isSameTree(p.left, q.left); // @viz: recurse_left
  boolean right = isSameTree(p.right, q.right); // @viz: recurse_right

  return left && right; // @viz: return_result
} // @viz: return_result