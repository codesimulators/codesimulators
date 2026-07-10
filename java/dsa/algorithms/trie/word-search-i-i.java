class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    String word = null;
}

class Solution {
    private TrieNode buildTrie(String[] words) { // @viz:build_trie
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode curr = root;
            for (char c : w.toCharArray()) {
                if (!curr.children.containsKey(c)) curr.children.put(c, new TrieNode());
                curr = curr.children.get(c);
            }
            curr.word = w;
        }
        return root;
    }

    public List<String> findWords(char[][] board, String[] words) { // @viz:init
        TrieNode root = buildTrie(words); // @viz:build_trie
        List<String> result = new ArrayList<>(); // @viz:init
        
        for (int r = 0; r < board.length; r++) { // @viz:grid_loop_r
            for (int c = 0; c < board[0].length; c++) { // @viz:grid_loop_c
                dfs(board, r, c, root, result); // @viz:dfs_call
            }
        }
        return result; // @viz:final
    }

    private void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) { // @viz:dfs_start
        char ch = board[r][c]; // @viz:dfs_char
        if (!node.children.containsKey(ch)) { // @viz:dfs_check_trie
            return; // @viz:dfs_return
        }
        
        node = node.children.get(ch); // @viz:dfs_move_trie
        if (node.word != null) { // @viz:dfs_check_word
            result.add(node.word); // @viz:dfs_found
            node.word = null; // @viz:dfs_sink
        }

        board[r][c] = '#'; // @viz:dfs_mark
        int[] dr = {-1, 1, 0, 0}; // @viz:dfs_neighbors
        int[] dc = {0, 0, -1, 1}; // @viz:dfs_neighbors
        
        for (int i = 0; i < 4; i++) { // @viz:dfs_loop
            int nr = r + dr[i]; // @viz:dfs_nr_nc
            int nc = c + dc[i]; // @viz:dfs_nr_nc
            if (nr >= 0 && nr < board.length && // @viz:dfs_bounds
                nc >= 0 && nc < board[0].length && 
                board[nr][nc] != '#') {
                dfs(board, nr, nc, node, result); // @viz:dfs_recurse
            }
        }
        board[r][c] = ch; // @viz:dfs_backtrack
    }
}