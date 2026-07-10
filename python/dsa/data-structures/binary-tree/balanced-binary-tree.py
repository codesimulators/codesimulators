# Definition for a binary tree node.
# class TreeNode: val, left, right

class Solution:
    def isBalanced(self, root): # @viz: is_balanced_start
        return self.checkHeight(root) != -1 # @viz: is_balanced_start
    
    def checkHeight(self, node): # @viz: check_height_start
        if not node: # @viz: base_case
            return 0 # @viz: base_case
        
        left = self.checkHeight(node.left) # @viz: recurse_left
        if left == -1: # @viz: calculate_result
            return -1
        right = self.checkHeight(node.right) # @viz: recurse_right
        if right == -1 or abs(left - right) > 1: # @viz: calculate_result
            return -1
        return 1 + max(left, right) # @viz: calculate_result