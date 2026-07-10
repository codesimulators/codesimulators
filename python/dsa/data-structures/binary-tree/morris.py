def morrisInorder(root):
    curr = root # @viz: init_curr
    result = [] # @viz: init_res
    while curr: # @viz: while_curr
        if not curr.left: # @viz: check_left
            result.append(curr.val) # @viz: visit_no_left
            curr = curr.right # @viz: move_right_no_left
        else:
            prev = curr.left # @viz: init_prev
            while prev.right and prev.right is not curr: # @viz: find_pred
                prev = prev.right # @viz: move_prev_right
            if not prev.right: # @viz: check_threaded
                prev.right = curr # @viz: create_thread
                curr = curr.left # @viz: move_left
            else:
                prev.right = None # @viz: destroy_thread
                result.append(curr.val) # @viz: visit_threaded
                curr = curr.right # @viz: move_right_post
    return result # @viz: return