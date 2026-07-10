/** Definition for a binary tree node */
// struct TreeNode {
//     int val; TreeNode *left; TreeNode *right;
// };

TreeNode* invertTree(TreeNode* root) { // @viz: entry
  if (!root) return nullptr; // @viz: base_check

  // @viz: swap
  TreeNode* temp = root->left;
  root->left = root->right;
  root->right = temp;

  invertTree(root->left); // @viz: recurse_left
  invertTree(root->right); // @viz: recurse_right

  return root; // @viz: return
} // @viz: return