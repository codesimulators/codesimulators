/** Definition for a binary tree node */
// struct TreeNode { int val; TreeNode *left; TreeNode *right; }

class Solution {
public:
    bool isBalanced(TreeNode* root) { // @viz: is_balanced_start
        return checkHeight(root) != -1; // @viz: is_balanced_start
    }
    
    int checkHeight(TreeNode* node) { // @viz: check_height_start
        if (!node) { // @viz: base_case
            return 0; // @viz: base_case
        }
        
        int left = checkHeight(node->left); // @viz: recurse_left
        if (left == -1) { // @viz: calculate_result
            return -1;
        }
        int right = checkHeight(node->right); // @viz: recurse_right
        if (right == -1 || abs(left - right) > 1) { // @viz: calculate_result
            return -1;
        }
        return 1 + max(left, right); // @viz: calculate_result
    }
};