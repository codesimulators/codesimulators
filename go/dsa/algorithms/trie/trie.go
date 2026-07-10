/**
 * Your Trie object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Insert(word);
 * param_2 := obj.Search(word);
 * param_3 := obj.StartsWith(prefix);
 */

type TrieNode struct {
    children    map[rune]*TrieNode
    isEndOfWord bool
}

type Trie struct {
    root *TrieNode
}

func Constructor() Trie { // @viz:init
    return Trie{root: &TrieNode{children: make(map[rune]*TrieNode)}}
}

func (this *Trie) Insert(word string) { // @viz:insert_start
    curr := this.root
    for _, char := range word { // @viz:insert_loop
        if _, exists := curr.children[char]; !exists { // @viz:insert_check
            curr.children[char] = &TrieNode{children: make(map[rune]*TrieNode)} // @viz:insert_new
        }
        curr = curr.children[char] // @viz:insert_next
    }
    curr.isEndOfWord = true // @viz:insert_end
}

func (this *Trie) Search(word string) bool { // @viz:search_start
    curr := this.root
    for _, char := range word { // @viz:search_loop
        if _, exists := curr.children[char]; !exists { // @viz:search_check
            return false // @viz:search_fail
        }
        curr = curr.children[char] // @viz:search_next
    }
    return curr.isEndOfWord // @viz:search_end
}

func (this *Trie) StartsWith(prefix string) bool { // @viz:starts_start
    curr := this.root
    for _, char := range prefix { // @viz:starts_loop
        if _, exists := curr.children[char]; !exists { // @viz:starts_check
            return false // @viz:starts_fail
        }
        curr = curr.children[char] // @viz:starts_next
    }
    return true // @viz:starts_end
}