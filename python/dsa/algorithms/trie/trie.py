"""
Your Trie object will be instantiated and called as such:
obj = Trie()
obj.insert(word)
param_2 = obj.search(word)
param_3 = obj.startsWith(prefix)
"""

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self): # @viz:init
        self.root = TrieNode()

    def insert(self, word: str) -> None: # @viz:insert_start
        curr = self.root
        for char in word: # @viz:insert_loop
            if char not in curr.children: # @viz:insert_check
                curr.children[char] = TrieNode() # @viz:insert_new
            curr = curr.children[char] # @viz:insert_next
        curr.is_end_of_word = True # @viz:insert_end

    def search(self, word: str) -> bool: # @viz:search_start
        curr = self.root
        for char in word: # @viz:search_loop
            if char not in curr.children: # @viz:search_check
                return False # @viz:search_fail
            curr = curr.children[char] # @viz:search_next
        return curr.is_end_of_word # @viz:search_end

    def startsWith(self, prefix: str) -> bool: # @viz:starts_start
        curr = self.root
        for char in prefix: # @viz:starts_loop
            if char not in curr.children: # @viz:starts_check
                return False # @viz:starts_fail
            curr = curr.children[char] # @viz:starts_next
        return True # @viz:starts_end