# Definition for a binary tree node.
# class TreeNode: val, left, right

class Solution:
    def __init__(self):
        self.prev = None
        
    def flatten(self, root): # @viz: function_start
        if not root: return # @viz: base_case
        
        self.flatten(root.right) # @viz: recurse_right
        self.flatten(root.left) # @viz: recurse_left
        
        root.right = self.prev # @viz: update_right
        root.left = None # @viz: update_left
        self.prev = root # @viz: update_prev