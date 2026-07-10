public class Main {
    public static void main(String[] args) throws InterruptedException {
        KVStore<String> store = new KVStore<>();
        Sweeper<String> sweeper = new Sweeper<>(store);

        store.set("session:9", "alice", 50);    // expires in 50ms
        store.set("cache:x", "result", 500);      // expires in 500ms

        System.out.println(store.get("session:9"));   // alice

        Thread.sleep(100);
        sweeper.tick(System.currentTimeMillis());       // proactively reclaims session:9
        System.out.println(store.get("session:9"));     // null — expired and swept
        System.out.println(store.get("cache:x"));        // result — untouched
    }
}