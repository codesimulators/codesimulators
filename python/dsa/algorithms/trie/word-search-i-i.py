class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

class Solution:
    def buildTrie(self, words): # @viz:build_trie
        root = TrieNode()
        for word in words:
            curr = root
            for char in word:
                if char not in curr.children:
                    curr.children[char] = TrieNode()
                curr = curr.children[char]
            curr.word = word
        return root

    def findWords(self, board, words): # @viz:init
        trie = self.buildTrie(words) # @viz:build_trie
        result = [] # @viz:init
        
        for r in range(len(board)): # @viz:grid_loop_r
            for c in range(len(board[0])): # @viz:grid_loop_c
                self.dfs(board, r, c, trie, result) # @viz:dfs_call
        return result # @viz:final

    def dfs(self, board, r, c, node, result): # @viz:dfs_start
        char = board[r][c] # @viz:dfs_char
        if char not in node.children: # @viz:dfs_check_trie
            return # @viz:dfs_return
            
        node = node.children[char] # @viz:dfs_move_trie
        if node.word: # @viz:dfs_check_word
            result.append(node.word) # @viz:dfs_found
            node.word = None # @viz:dfs_sink
            
        board[r][c] = "#" # @viz:dfs_mark
        
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]: # @viz:dfs_loop
            nr = r + dr # @viz:dfs_nr_nc
            nc = c + dc # @viz:dfs_nr_nc
            if 0 <= nr < len(board) and \
               0 <= nc < len(board[0]) and \
               board[nr][nc] != "#": # @viz:dfs_bounds
                self.dfs(board, nr, nc, node, result) # @viz:dfs_recurse
                
        board[r][c] = char # @viz:dfs_backtrack