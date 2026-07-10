# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def maxDepth(self, node): # @viz: function_start
    if not node: # @viz: base_case
        return 0 # @viz: base_case
    left = self.maxDepth(node.left) # @viz: recurse_left
    right = self.maxDepth(node.right) # @viz: recurse_right
    return max(left, right) + 1 # @viz: return_result @viz: RESULT