/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord = false;
};

class Trie {
    TrieNode* root;
public:
    Trie() { // @viz:init
        root = new TrieNode();
    }

    void insert(string word) { // @viz:insert_start
        TrieNode* curr = root;
        for (char c : word) { // @viz:insert_loop
            if (curr->children.find(c) == curr->children.end()) { // @viz:insert_check
                curr->children[c] = new TrieNode(); // @viz:insert_new
            }
            curr = curr->children[c]; // @viz:insert_next
        }
        curr->isEndOfWord = true; // @viz:insert_end
    }

    bool search(string word) { // @viz:search_start
        TrieNode* curr = root;
        for (char c : word) { // @viz:search_loop
            if (curr->children.find(c) == curr->children.end()) { // @viz:search_check
                return false; // @viz:search_fail
            }
            curr = curr->children[c]; // @viz:search_next
        }
        return curr->isEndOfWord; // @viz:search_end
    }

    bool startsWith(string prefix) { // @viz:starts_start
        TrieNode* curr = root;
        for (char c : prefix) { // @viz:starts_loop
            if (curr->children.find(c) == curr->children.end()) { // @viz:starts_check
                return false; // @viz:starts_fail
            }
            curr = curr->children[c]; // @viz:starts_next
        }
        return true; // @viz:starts_end
    }
};