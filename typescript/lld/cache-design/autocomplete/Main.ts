import { Trie } from './Trie';

const trie = new Trie();
trie.insert('car', 9);
trie.insert('care', 6);
trie.insert('cat', 5);
trie.insert('cart', 4);

console.log(trie.query('ca'));    // [car(9), care(6), cat(5)] — top 3 sharing "ca"
console.log(trie.query('car'));   // [car(9), care(6), cart(4)] — "cat" drops off here

trie.incrementScore('cat', 10);   // cat: 5 -> 15
console.log(trie.query('ca'));    // cat now ranks first