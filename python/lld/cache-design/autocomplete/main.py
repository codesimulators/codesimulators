from trie import Trie

trie = Trie()
trie.insert("car", 9)
trie.insert("care", 6)
trie.insert("cat", 5)
trie.insert("cart", 4)

print(trie.query("ca"))     # [car(9), care(6), cat(5)]
print(trie.query("car"))    # [car(9), care(6), cart(4)] — "cat" drops off

trie.increment_score("cat", 10)   # cat: 5 -> 15
print(trie.query("ca"))            # cat now ranks first