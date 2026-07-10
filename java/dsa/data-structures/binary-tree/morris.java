public List<Integer> morrisInorder(TreeNode root) {
  TreeNode curr = root; // @viz: init_curr
  List<Integer> result = new ArrayList<>(); // @viz: init_res
  while (curr != null) { // @viz: while_curr
    if (curr.left == null) { // @viz: check_left
      result.add(curr.val); // @viz: visit_no_left
      curr = curr.right; // @viz: move_right_no_left
    } else {
      TreeNode prev = curr.left; // @viz: init_prev
      while (prev.right != null && prev.right != curr) { // @viz: find_pred
        prev = prev.right; // @viz: move_prev_right
      }
      if (prev.right == null) { // @viz: check_threaded
        prev.right = curr; // @viz: create_thread
        curr = curr.left; // @viz: move_left
      } else {
        prev.right = null; // @viz: destroy_thread
        result.add(curr.val); // @viz: visit_threaded
        curr = curr.right; // @viz: move_right_post
      }
    }
  }
  return result; // @viz: return
}