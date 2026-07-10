func Constructor() WordDictionary { // @viz:init
    return WordDictionary{root: &Node{children: make(map[rune]*Node)}} // @viz:init
}

func (this *WordDictionary) AddWord(word string) { // @viz:add_start
    curr := this.root // @viz:add_start
    for _, char := range word { // @viz:add_loop
        if _, exists := curr.children[char]; !exists { // @viz:add_check
            curr.children[char] = &Node{children: make(map[rune]*Node)} // @viz:add_new
        }
        curr = curr.children[char] // @viz:add_next
    }
    curr.isEnd = true // @viz:add_end
}

func (this *WordDictionary) Search(word string) bool { // @viz:search_start
    return dfs(this.root, 0, word) // @viz:search_start
}

func dfs(node *Node, index int, word string) bool { // @viz:dfs_start
    if index == len(word) { // @viz:dfs_base_check
        return node.isEnd // @viz:dfs_base
    }
    
    char := rune(word[index]) // @viz:dfs_char
    if char != '.' { // @viz:dfs_not_dot_check @viz:dfs_not_dot
        if child, exists := node.children[char]; exists { // @viz:dfs_recurse
            return dfs(child, index + 1, word) // @viz:dfs_recurse
        }
        return false // @viz:dfs_check_fail
    }
    
    for _, child := range node.children { // @viz:dfs_dot_loop
        if dfs(child, index + 1, word) { // @viz:dfs_dot_recurse
            return true // @viz:dfs_dot_found
        }
    }
    return false // @viz:dfs_fail
}