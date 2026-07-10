# Definition for a binary tree node.
# class TreeNode: val, left, right

class Solution:
    def diameterOfBinaryTree(self, root): # @viz: function_start
        self.diameter = 0
        self.height(root) # @viz: height_start
        return self.diameter # @viz: function_start
    
    # Helper function to calculate height
    def height(self, node): # @viz: height_start
        if not node: return 0 # @viz: base_case
        
        left = self.height(node.left) # @viz: recurse_left
        right = self.height(node.right) # @viz: recurse_right
        
        self.diameter = max(self.diameter, left + right) # @viz: update_diameter
        return 1 + max(left, right) # @viz: return_height

