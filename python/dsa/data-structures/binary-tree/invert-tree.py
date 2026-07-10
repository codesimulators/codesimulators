# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val=val; self.left=left; self.right=right

def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]: # @viz: entry
    if not root: # @viz: base_check
        return None # @viz: base_check

    # @viz: swap
    root.left, root.right = root.right, root.left

    self.invertTree(root.left) # @viz: recurse_left
    self.invertTree(root.right) # @viz: recurse_right

    return root # @viz: return