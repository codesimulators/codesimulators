class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def inorder(node):
    if not node: return
    inorder(node.left)
    visit(node)
    inorder(node.right)

# Main execution
root = build_tree([])
inorder(root)