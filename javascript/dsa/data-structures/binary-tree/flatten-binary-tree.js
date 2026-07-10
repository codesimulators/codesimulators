/** Definition for a binary tree node */
// class TreeNode { val, left, right }

var flatten = function(root) { // @viz: function_start
    let prev = null;
    
    const traverse = (node) => {
        if (!node) return; // @viz: base_case
        
        traverse(node.right); // @viz: recurse_right
        traverse(node.left); // @viz: recurse_left
        
        node.right = prev; // @viz: update_right
        node.left = null; // @viz: update_left
        prev = node; // @viz: update_prev
    };
    
    traverse(root); // @viz: function_start
};