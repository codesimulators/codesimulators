# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def isSameTree(self, p, q): # @viz: function_start
    if not p and not q: # @viz: base_both_null
        return True # @viz: base_both_null
    if not p or not q or p.val != q.val: # @viz: base_mismatch
        return False # @viz: base_mismatch

    left = self.isSameTree(p.left, q.left) # @viz: recurse_left
    right = self.isSameTree(p.right, q.right) # @viz: recurse_right

    return left and right # @viz: return_result