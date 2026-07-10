/** Definition for a binary tree node. */
// struct TreeNode {
//     int val; TreeNode *left; TreeNode *right;
// };

bool isSameTree(TreeNode* p, TreeNode* q) { // @viz: function_start
  if (!p && !q) { // @viz: base_both_null
    return true; // @viz: base_both_null
  }
  if (!p || !q || p->val != q->val) { // @viz: base_mismatch
    return false; // @viz: base_mismatch
  }

  bool left = isSameTree(p->left, q->left); // @viz: recurse_left
  bool right = isSameTree(p->right, q->right); // @viz: recurse_right

  return left && right; // @viz: return_result
} // @viz: return_result