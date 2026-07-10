# Definition for a binary tree node.
# class TreeNode: val, left, right

def isSymmetric(self, root): # @viz: is_symmetric_start
    if not root: # @viz: is_symmetric_base
        return True # @viz: is_symmetric_base
    return self.isMirror(root.left, root.right) # @viz: is_symmetric_call

def isMirror(self, t1, t2): # @viz: is_mirror_start
    if not t1 and not t2: # @viz: base_both_null
        return True # @viz: base_both_null
    if not t1 or not t2 or t1.val != t2.val: # @viz: base_mismatch
        return False # @viz: base_mismatch

    return self.isMirror(t1.left, t2.right) and \
           self.isMirror(t1.right, t2.left) # @viz: recurse_inner