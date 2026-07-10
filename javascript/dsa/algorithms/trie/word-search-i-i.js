class TrieNode {
  constructor() {
    this.children = {};
    this.word = null;
  }
}

class Solution {
  buildTrie(words) { // @viz:build_trie
    const root = new TrieNode();
    for (let word of words) {
      let curr = root;
      for (let char of word) {
        if (!curr.children[char]) curr.children[char] = new TrieNode();
        curr = curr.children[char];
      }
      curr.word = word;
    }
    return root;
  }

  findWords(board, words) { // @viz:init
    const trie = this.buildTrie(words); // @viz:build_trie
    const result = []; // @viz:init
    
    for (let r = 0; r < board.length; r++) { // @viz:grid_loop_r
      for (let c = 0; c < board[0].length; c++) { // @viz:grid_loop_c
        this.dfs(board, r, c, trie, result); // @viz:dfs_call
      }
    }
    return result; // @viz:final
  }

  dfs(board, r, c, node, result) { // @viz:dfs_start
    const char = board[r][c]; // @viz:dfs_char
    if (!node.children[char]) { // @viz:dfs_check_trie
      return; // @viz:dfs_return
    }
    
    node = node.children[char]; // @viz:dfs_move_trie
    if (node.word) { // @viz:dfs_check_word
      result.push(node.word); // @viz:dfs_found
      node.word = null; // @viz:dfs_sink
    }

    board[r][c] = "#"; // @viz:dfs_mark
    const neighbors = [[-1,0], [1,0], [0,-1], [0,1]]; // @viz:dfs_neighbors
    
    for (const [dr, dc] of neighbors) { // @viz:dfs_loop
      const nr = r + dr; // @viz:dfs_nr_nc
      const nc = c + dc; // @viz:dfs_nr_nc
      
      if (nr >= 0 && nr < board.length && // @viz:dfs_bounds
          nc >= 0 && nc < board[0].length &&
          board[nr][nc] !== "#") {
        this.dfs(board, nr, nc, node, result); // @viz:dfs_recurse
      }
    }
    board[r][c] = char; // @viz:dfs_backtrack
  }
}