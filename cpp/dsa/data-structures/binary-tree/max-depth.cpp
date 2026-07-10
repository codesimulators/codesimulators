/** Definition for a binary tree node. */
// struct TreeNode {
//     int val; TreeNode *left; TreeNode *right;
// };

int maxDepth(TreeNode* node) { // @viz: function_start
  if (!node) return 0; // @viz: base_case
  int left = maxDepth(node->left); // @viz: recurse_left
  int right = maxDepth(node->right); // @viz: recurse_right
  return max(left, right) + 1; // @viz: return_result
} // @viz: RESULT