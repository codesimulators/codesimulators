class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def search_bst(root, val):
    if not root: return None
    if root.value == val: return root
    if val < root.value:
        return search_bst(root.left, val)
    return search_bst(root.right, val)

# Main execution
root = build_tree([])
search_bst(root, 0,0)