class WordDictionary:
    def __init__(self): # @viz:init
        self.root = { # @viz:init
            "children": {}, # @viz:init
            "isEnd": False # @viz:init
        } # @viz:init

    def addWord(self, word: str) -> None: # @viz:add_start
        curr = self.root # @viz:add_start
        for char in word: # @viz:add_loop
            if char not in curr["children"]: # @viz:add_check
                curr["children"][char] = { # @viz:add_new
                    "children": {}, # @viz:add_new
                    "isEnd": False # @viz:add_new
                } # @viz:add_new
            curr = curr["children"][char] # @viz:add_next
        curr["isEnd"] = True # @viz:add_end

    def search(self, word: str) -> bool: # @viz:search_start
        return self.dfs(self.root, 0, word) # @viz:search_start

    def dfs(self, node, index, word): # @viz:dfs_start
        if index == len(word): # @viz:dfs_base_check
            return node["isEnd"] # @viz:dfs_base
        
        char = word[index] # @viz:dfs_char
        if char != '.': # @viz:dfs_not_dot_check @viz:dfs_not_dot
            if char not in node["children"]: # @viz:dfs_check_fail
                return False # @viz:dfs_check_fail
            return self.dfs( # @viz:dfs_recurse
                node["children"][char], # @viz:dfs_recurse
                index + 1, # @viz:dfs_recurse
                word # @viz:dfs_recurse
            ) # @viz:dfs_recurse
            
        for key in node["children"]: # @viz:dfs_dot_loop
            if self.dfs(node["children"][key], index + 1, word): # @viz:dfs_dot_recurse
                return True # @viz:dfs_dot_found
        return False # @viz:dfs_fail