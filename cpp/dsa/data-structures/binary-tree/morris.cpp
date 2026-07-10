vector<int> morrisInorder(TreeNode* root) {
    TreeNode* curr = root; // @viz: init_curr
    vector<int> result; // @viz: init_res
    while (curr) { // @viz: while_curr
        if (!curr->left) { // @viz: check_left
            result.push_back(curr->val); // @viz: visit_no_left
            curr = curr->right; // @viz: move_right_no_left
        } else {
            TreeNode* prev = curr->left; // @viz: init_prev
            while (prev->right && prev->right != curr) { // @viz: find_pred
                prev = prev->right; // @viz: move_prev_right
            }
            if (!prev->right) { // @viz: check_threaded
                prev->right = curr; // @viz: create_thread
                curr = curr->left; // @viz: move_left
            } else {
                prev->right = NULL; // @viz: destroy_thread
                result.push_back(curr->val); // @viz: visit_threaded
                curr = curr->right; // @viz: move_right_post
            }
        }
    }
    return result; // @viz: return
}