/** Definition for a binary tree node */
// type TreeNode struct { Val int; Left, Right *TreeNode }

var prev *TreeNode

func flatten(root *TreeNode) { // @viz: function_start
    prev = nil
    var traverse func(*TreeNode)
    traverse = func(node *TreeNode) {
        if node == nil { return } // @viz: base_case
        
        traverse(node.Right) // @viz: recurse_right
        traverse(node.Left) // @viz: recurse_left
        
        node.Right = prev // @viz: update_right
        node.Left = nil // @viz: update_left
        prev = node // @viz: update_prev
    }
    traverse(root) // @viz: function_start
}