/** Definition for a binary tree node */
// type TreeNode struct { Val int; Left, Right *TreeNode }

func diameterOfBinaryTree(root *TreeNode) int { // @viz: function_start
    diameter := 0
    var height func(*TreeNode) int
    height = func(node *TreeNode) int { // @viz: height_start
        if node == nil { return 0 } // @viz: base_case
        
        left := height(node.Left) // @viz: recurse_left
        right := height(node.Right) // @viz: recurse_right
        
        if left + right > diameter { diameter = left + right } // @viz: update_diameter
        if left > right { return 1 + left } // @viz: return_height
        return 1 + right // @viz: return_height
    }
    height(root) // @viz: height_start
    return diameter // @viz: function_start
}