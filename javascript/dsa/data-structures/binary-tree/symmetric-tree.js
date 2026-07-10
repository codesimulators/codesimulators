/** Definition for a binary tree node */
// class TreeNode { val, left, right }

function isSymmetric(root) { // @viz: is_symmetric_start
  if (!root) { // @viz: is_symmetric_base
    return true; // @viz: is_symmetric_base
  }
  return isMirror(root.left, root.right); // @viz: is_symmetric_call
}

function isMirror(t1, t2) { // @viz: is_mirror_start
  if (!t1 && !t2) { // @viz: base_both_null
    return true; // @viz: base_both_null
  }
  if (!t1 || !t2 || t1.val !== t2.val) { // @viz: base_mismatch
    return false; // @viz: base_mismatch
  }

  return isMirror(t1.left, t2.right) && // @viz: recurse_outer
         isMirror(t1.right, t2.left); // @viz: recurse_inner
}