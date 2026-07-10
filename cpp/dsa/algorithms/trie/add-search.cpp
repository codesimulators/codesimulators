class WordDictionary {
    struct Node {
        unordered_map<char, Node*> children;
        bool isEnd = false;
    };
    Node* root;

public:
    WordDictionary() { // @viz:init
        root = new Node(); // @viz:init
    }

    void addWord(string word) { // @viz:add_start
        Node* curr = root; // @viz:add_start
        for (char c : word) { // @viz:add_loop
            if (curr->children.find(c) == curr->children.end()) { // @viz:add_check
                curr->children[c] = new Node(); // @viz:add_new
            }
            curr = curr->children[c]; // @viz:add_next
        }
        curr->isEnd = true; // @viz:add_end
    }

    bool search(string word) { // @viz:search_start
        return dfs(root, 0, word); // @viz:search_start
    }

    bool dfs(Node* node, int index, string& word) { // @viz:dfs_start
        if (index == word.length()) { // @viz:dfs_base_check
            return node->isEnd; // @viz:dfs_base
        }
        
        char c = word[index]; // @viz:dfs_char
        if (c != '.') { // @viz:dfs_not_dot_check @viz:dfs_not_dot
            if (node->children.find(c) == node->children.end()) { // @viz:dfs_check_fail
                return false; // @viz:dfs_check_fail
            }
            return dfs(node->children[c], index + 1, word); // @viz:dfs_recurse
        }
        
        for (auto& pair : node->children) { // @viz:dfs_dot_loop
            if (dfs(pair.second, index + 1, word)) { // @viz:dfs_dot_recurse
                return true; // @viz:dfs_dot_found
            }
        }
        return false; // @viz:dfs_fail
    }
};