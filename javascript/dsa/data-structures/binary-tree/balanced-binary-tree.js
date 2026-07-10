/** Definition for a binary tree node */
// class TreeNode { val, left, right }

var isBalanced = function(root) { // @viz: is_balanced_start
    const checkHeight = (node) => { // @viz: check_height_start
        if (!node) { // @viz: base_case
            return 0; // @viz: base_case
        }
        
        const left = checkHeight(node.left); // @viz: recurse_left
        if (left === -1) { // @viz: calculate_result
            return -1;
        }
        const right = checkHeight(node.right); // @viz: recurse_right
        if (right === -1 || Math.abs(left - right) > 1) { // @viz: calculate_result
            return -1;
        }
        return 1 + Math.max(left, right); // @viz: calculate_result
    };
    
    return checkHeight(root) !== -1; // @viz: is_balanced_start
};