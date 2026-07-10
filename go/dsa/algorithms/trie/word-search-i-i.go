type TrieNode struct {
    children map[byte]*TrieNode
    word     string
}

func buildTrie(words []string) *TrieNode { // @viz:build_trie
    root := &TrieNode{children: make(map[byte]*TrieNode)}
    for _, w := range words {
        curr := root
        for i := 0; i < len(w); i++ {
            c := w[i]
            if _, ok := curr.children[c]; !ok {
                curr.children[c] = &TrieNode{children: make(map[byte]*TrieNode)}
            }
            curr = curr.children[c]
        }
        curr.word = w
    }
    return root
}

func findWords(board [][]byte, words []string) []string { // @viz:init
    root := buildTrie(words) // @viz:build_trie
    result := []string{} // @viz:init
    
    for r := 0; r < len(board); r++ { // @viz:grid_loop_r
        for c := 0; c < len(board[0]); c++ { // @viz:grid_loop_c
            dfs(board, r, c, root, &result) // @viz:dfs_call
        }
    }
    return result // @viz:final
}

func dfs(board [][]byte, r, c int, node *TrieNode, result *[]string) { // @viz:dfs_start
    ch := board[r][c] // @viz:dfs_char
    if nextNode, ok := node.children[ch]; ok { // @viz:dfs_check_trie
        node = nextNode // @viz:dfs_move_trie
    } else {
        return // @viz:dfs_return
    }
    
    if node.word != "" { // @viz:dfs_check_word
        *result = append(*result, node.word) // @viz:dfs_found
        node.word = "" // @viz:dfs_sink
    }

    board[r][c] = '#' // @viz:dfs_mark
    dirs := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} // @viz:dfs_neighbors
    
    for _, d := range dirs { // @viz:dfs_loop
        nr := r + d[0] // @viz:dfs_nr_nc
        nc := c + d[1] // @viz:dfs_nr_nc
        if nr >= 0 && nr < len(board) && // @viz:dfs_bounds
            nc >= 0 && nc < len(board[0]) &&
            board[nr][nc] != '#' {
            dfs(board, nr, nc, node, result) // @viz:dfs_recurse
        }
    }
    board[r][c] = ch // @viz:dfs_backtrack
}