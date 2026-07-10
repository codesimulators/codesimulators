/** Definition for a binary tree node */
// class TreeNode { int val; TreeNode left; TreeNode right; }

class Solution {
    private TreeNode prev = null;
    
    public void flatten(TreeNode root) { // @viz: function_start
        if (root == null) return; // @viz: base_case
        
        flatten(root.right); // @viz: recurse_right
        flatten(root.left); // @viz: recurse_left
        
        root.right = prev; // @viz: update_right
        root.left = null; // @viz: update_left
        prev = root; // @viz: update_prev
    }
}