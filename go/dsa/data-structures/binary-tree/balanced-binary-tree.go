/** Definition for a binary tree node */
// type TreeNode struct { Val int; Left, Right *TreeNode }

func isBalanced(root *TreeNode) bool { // @viz: is_balanced_start
    var checkHeight func(*TreeNode) int
    checkHeight = func(node *TreeNode) int { // @viz: check_height_start
        if node == nil { // @viz: base_case
            return 0 // @viz: base_case
        }
        
        left := checkHeight(node.Left) // @viz: recurse_left
        if left == -1 { // @viz: calculate_result
            return -1
        }
        right := checkHeight(node.Right) // @viz: recurse_right
        if right == -1 || abs(left - right) > 1 { // @viz: calculate_result
            return -1
        }
        if left > right { return 1 + left } // @viz: calculate_result
        return 1 + right // @viz: calculate_result
    }
    return checkHeight(root) != -1 // @viz: is_balanced_start
}
func abs(x int) int { if x < 0 { return -x }; return x }