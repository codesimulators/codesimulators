/** Definition for a binary tree node */
// class TreeNode { int val; TreeNode left; TreeNode right; }

class Solution {
    int diameter = 0;
    
    public int diameterOfBinaryTree(TreeNode root) { // @viz: function_start
        height(root); // @viz: height_start
        return diameter; // @viz: function_start
    }
    
    private int height(TreeNode node) { // @viz: height_start
        if (node == null) return 0; // @viz: base_case
        
        int left = height(node.left); // @viz: recurse_left
        int right = height(node.right); // @viz: recurse_right
        
        diameter = Math.max(diameter, left + right); // @viz: update_diameter
        return 1 + Math.max(left, right); // @viz: return_height
    }
}