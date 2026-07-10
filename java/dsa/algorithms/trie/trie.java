/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEndOfWord;
}

class Trie {
    private TrieNode root;

    public Trie() { // @viz:init
        root = new TrieNode();
    }

    public void insert(String word) { // @viz:insert_start
        TrieNode curr = root;
        for (char c : word.toCharArray()) { // @viz:insert_loop
            if (!curr.children.containsKey(c)) { // @viz:insert_check
                curr.children.put(c, new TrieNode()); // @viz:insert_new
            }
            curr = curr.children.get(c); // @viz:insert_next
        }
        curr.isEndOfWord = true; // @viz:insert_end
    }

    public boolean search(String word) { // @viz:search_start
        TrieNode curr = root;
        for (char c : word.toCharArray()) { // @viz:search_loop
            if (!curr.children.containsKey(c)) { // @viz:search_check
                return false; // @viz:search_fail
            }
            curr = curr.children.get(c); // @viz:search_next
        }
        return curr.isEndOfWord; // @viz:search_end
    }

    public boolean startsWith(String prefix) { // @viz:starts_start
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) { // @viz:starts_loop
            if (!curr.children.containsKey(c)) { // @viz:starts_check
                return false; // @viz:starts_fail
            }
            curr = curr.children.get(c); // @viz:starts_next
        }
        return true; // @viz:starts_end
    }
}