/** Definition for a binary tree node. */
// type TreeNode struct {
//     Val int; Left *TreeNode; Right *TreeNode
// }

func isSameTree(p *TreeNode, q *TreeNode) bool { // @viz: function_start
  if p == nil && q == nil { // @viz: base_both_null
    return true // @viz: base_both_null
  }
  if p == nil || q == nil || p.Val != q.Val { // @viz: base_mismatch
    return false // @viz: base_mismatch
  }

  left := isSameTree(p.Left, q.Left) // @viz: recurse_left
  right := isSameTree(p.Right, q.Right) // @viz: recurse_right

  return left && right // @viz: return_result
} // @viz: return_result