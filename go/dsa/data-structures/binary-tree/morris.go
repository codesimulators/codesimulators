func morrisInorder(root *TreeNode) []int {
    curr := root // @viz: init_curr
    result := []int{} // @viz: init_res
    for curr != nil { // @viz: while_curr
        if curr.Left == nil { // @viz: check_left
            result = append(result, curr.Val) // @viz: visit_no_left
            curr = curr.Right // @viz: move_right_no_left
        } else {
            prev := curr.Left // @viz: init_prev
            for prev.Right != nil && prev.Right != curr { // @viz: find_pred
                prev = prev.Right // @viz: move_prev_right
            }
            if prev.Right == nil { // @viz: check_threaded
                prev.Right = curr // @viz: create_thread
                curr = curr.Left // @viz: move_left
            } else {
                prev.Right = nil // @viz: destroy_thread
                result = append(result, curr.Val) // @viz: visit_threaded
                curr = curr.Right // @viz: move_right_post
            }
        }
    }
    return result // @viz: return
}