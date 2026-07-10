/** Definition for a binary tree node. */
// type TreeNode struct {
//     Val int; Left *TreeNode; Right *TreeNode
// }

func MaxDepth(node *TreeNode) int { // @viz: function_start
  if node == nil { return 0 } // @viz: base_case
  left := MaxDepth(node.Left) // @viz: recurse_left
  right := MaxDepth(node.Right) // @viz: recurse_right
  return max(left, right) + 1 // @viz: return_result
} // @viz: RESULT