/** Definition for a binary tree node */
// type TreeNode struct { Val int; Left *TreeNode; Right *TreeNode }

func isSymmetric(root *TreeNode) bool { // @viz: is_symmetric_start
    if root == nil { // @viz: is_symmetric_base
        return true // @viz: is_symmetric_base
    }
    return isMirror(root.Left, root.Right) // @viz: is_symmetric_call
}

func isMirror(t1 *TreeNode, t2 *TreeNode) bool { // @viz: is_mirror_start
    if t1 == nil && t2 == nil { // @viz: base_both_null
        return true // @viz: base_both_null
    }
    if t1 == nil || t2 == nil || t1.Val != t2.Val { // @viz: base_mismatch
        return false // @viz: base_mismatch
    }

    return isMirror(t1.Left, t2.Right) && // @viz: recurse_outer
           isMirror(t1.Right, t2.Left) // @viz: recurse_inner
}