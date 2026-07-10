class WordDictionary {
    private class Node {
        Map<Character, Node> children = new HashMap<>();
        boolean isEnd = false;
    }

    private Node root;

    public WordDictionary() { // @viz:init
        root = new Node(); // @viz:init
    }

    public void addWord(String word) { // @viz:add_start
        Node curr = root; // @viz:add_start
        for (char c : word.toCharArray()) { // @viz:add_loop
            if (!curr.children.containsKey(c)) { // @viz:add_check
                curr.children.put(c, new Node()); // @viz:add_new
            }
            curr = curr.children.get(c); // @viz:add_next
        }
        curr.isEnd = true; // @viz:add_end
    }

    public boolean search(String word) { // @viz:search_start
        return dfs(root, 0, word); // @viz:search_start
    }

    private boolean dfs(Node node, int index, String word) { // @viz:dfs_start
        if (index == word.length()) { // @viz:dfs_base_check
            return node.isEnd; // @viz:dfs_base
        }
        
        char c = word.charAt(index); // @viz:dfs_char
        if (c != '.') { // @viz:dfs_not_dot_check @viz:dfs_not_dot
            if (!node.children.containsKey(c)) { // @viz:dfs_check_fail
                return false; // @viz:dfs_check_fail
            }
            return dfs(node.children.get(c), index + 1, word); // @viz:dfs_recurse
        }
        
        for (Node child : node.children.values()) { // @viz:dfs_dot_loop
            if (dfs(child, index + 1, word)) { // @viz:dfs_dot_recurse
                return true; // @viz:dfs_dot_found
            }
        }
        return false; // @viz:dfs_fail
    }
}