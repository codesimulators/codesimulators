public class Main {
    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("car", 9);
        trie.insert("care", 6);
        trie.insert("cat", 5);
        trie.insert("cart", 4);

        System.out.println(trie.query("ca"));    // [car(9.0), care(6.0), cat(5.0)]
        System.out.println(trie.query("car"));   // [car(9.0), care(6.0), cart(4.0)] — "cat" drops off

        trie.incrementScore("cat", 10);           // cat: 5 -> 15
        System.out.println(trie.query("ca"));     // cat now ranks first
    }
}