/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() { // @viz:init
    this.root = new TrieNode();
  }

  insert(word) { // @viz:insert_start
    let curr = this.root;
    for (let char of word) { // @viz:insert_loop
      if (!curr.children[char]) { // @viz:insert_check
        curr.children[char] = new TrieNode(); // @viz:insert_new
      }
      curr = curr.children[char]; // @viz:insert_next
    }
    curr.isEndOfWord = true; // @viz:insert_end
  }

  search(word) { // @viz:search_start
    let curr = this.root;
    for (let char of word) { // @viz:search_loop
      if (!curr.children[char]) { // @viz:search_check
        return false; // @viz:search_fail
      }
      curr = curr.children[char]; // @viz:search_next
    }
    return curr.isEndOfWord; // @viz:search_end
  }

  startsWith(prefix) { // @viz:starts_start
    let curr = this.root;
    for (let char of prefix) { // @viz:starts_loop
      if (!curr.children[char]) { // @viz:starts_check
        return false; // @viz:starts_fail
      }
      curr = curr.children[char]; // @viz:starts_next
    }
    return true; // @viz:starts_end
  }
}