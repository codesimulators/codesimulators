/** Definition for a binary tree node */
// class TreeNode { val, left, right }

var diameterOfBinaryTree = function(root) { // @viz: function_start
    let diameter = 0;
    const height = (node) => { // @viz: height_start
        if (!node) return 0; // @viz: base_case
        
        let left = height(node.left); // @viz: recurse_left
        let right = height(node.right); // @viz: recurse_right
        
        diameter = Math.max(diameter, left + right); // @viz: update_diameter
        return 1 + Math.max(left, right); // @viz: return_height
    };
    
    height(root); // @viz: height_start
    return diameter; // @viz: function_start
};