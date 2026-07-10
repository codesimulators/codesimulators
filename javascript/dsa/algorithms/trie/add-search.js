class WordDictionary {
  constructor() { // @viz:init
    this.root = { // @viz:init
      children: {}, // @viz:init
      isEnd: false // @viz:init
    }; // @viz:init
  }

  addWord(word) { // @viz:add_start
    let curr = this.root; // @viz:add_start
    for (let char of word) { // @viz:add_loop
      if (!curr.children[char]) { // @viz:add_check
        curr.children[char] = { // @viz:add_new
          children: {}, // @viz:add_new
          isEnd: false // @viz:add_new
        }; // @viz:add_new
      }
      curr = curr.children[char]; // @viz:add_next
    }
    curr.isEnd = true; // @viz:add_end
  }

  search(word) { // @viz:search_start
    return this.dfs(this.root, 0, word); // @viz:search_start
  }

  dfs(node, index, word) { // @viz:dfs_start
    if (index === word.length) { // @viz:dfs_base_check
      return node.isEnd; // @viz:dfs_base
    } 
    
    let char = word[index]; // @viz:dfs_char
    if (char !== '.') { // @viz:dfs_not_dot_check @viz:dfs_not_dot
      if (!node.children[char]) { // @viz:dfs_check_fail
        return false; // @viz:dfs_check_fail
      }
      return this.dfs( // @viz:dfs_recurse
        node.children[char], 
        index + 1, 
        word
      );
    }
    
    for (let key in node.children) { // @viz:dfs_dot_loop
      if (this.dfs(node.children[key], index + 1, word)) { // @viz:dfs_dot_recurse
        return true; // @viz:dfs_dot_found
      }
    }
    return false; // @viz:dfs_fail
  }
}