public class Main {
    public static void main(String[] args) {
        LRUCache<String, Integer> cache = new LRUCache<>(3);
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);         // cache: [C, B, A]

        cache.get("A");             // cache: [A, C, B] — A moved to the front

        cache.put("D", 4);          // over capacity -> evict B (the tail)
        System.out.println(cache.get("B"));   // null — evicted
        System.out.println(cache.get("D"));   // 4
    }
}