/** Definition for a binary tree node */
// type TreeNode struct {
//     Val int; Left *TreeNode; Right *TreeNode
// }

func invertTree(root *TreeNode) *TreeNode { // @viz: entry
  if root == nil { return nil } // @viz: base_check

  // @viz: swap
  root.Left, root.Right = root.Right, root.Left

  invertTree(root.Left) // @viz: recurse_left
  invertTree(root.Right) // @viz: recurse_right

  return root // @viz: return
}