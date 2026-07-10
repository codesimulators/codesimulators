struct TrieNode {
    unordered_map<char, TrieNode*> children;
    string word = "";
};

class Solution {
    TrieNode* buildTrie(vector<string>& words) { // @viz:build_trie
        TrieNode* root = new TrieNode();
        for (string& w : words) {
            TrieNode* curr = root;
            for (char c : w) {
                if (curr->children.find(c) == curr->children.end()) 
                    curr->children[c] = new TrieNode();
                curr = curr->children[c];
            }
            curr->word = w;
        }
        return root;
    }

public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) { // @viz:init
        TrieNode* root = buildTrie(words); // @viz:build_trie
        vector<string> result; // @viz:init
        
        for (int r = 0; r < board.size(); r++) { // @viz:grid_loop_r
            for (int c = 0; c < board[0].size(); c++) { // @viz:grid_loop_c
                dfs(board, r, c, root, result); // @viz:dfs_call
            }
        }
        return result; // @viz:final
    }

    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& result) { // @viz:dfs_start
        char ch = board[r][c]; // @viz:dfs_char
        if (node->children.find(ch) == node->children.end()) { // @viz:dfs_check_trie
            return; // @viz:dfs_return
        }
        
        node = node->children[ch]; // @viz:dfs_move_trie
        if (!node->word.empty()) { // @viz:dfs_check_word
            result.push_back(node->word); // @viz:dfs_found
            node->word = ""; // @viz:dfs_sink
        }

        board[r][c] = '#'; // @viz:dfs_mark
        int dr[] = {-1, 1, 0, 0}; // @viz:dfs_neighbors
        int dc[] = {0, 0, -1, 1}; // @viz:dfs_neighbors
        
        for (int i = 0; i < 4; i++) { // @viz:dfs_loop
            int nr = r + dr[i]; // @viz:dfs_nr_nc
            int nc = c + dc[i]; // @viz:dfs_nr_nc
            if (nr >= 0 && nr < board.size() && // @viz:dfs_bounds
                nc >= 0 && nc < board[0].size() && 
                board[nr][nc] != '#') {
                dfs(board, nr, nc, node, result); // @viz:dfs_recurse
            }
        }
        board[r][c] = ch; // @viz:dfs_backtrack
    }
};