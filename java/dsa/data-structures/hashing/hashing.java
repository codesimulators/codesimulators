public class MyHashMap {
    public void put(String key, int value) {
        int hash = calculateHash(key);
        int index = hash % tableSize;
        if (table[index] == null) {
            table[index] = new LinkedList<>();
        }
        table[index].add(new Entry(key, value));
    }
    
    public static void main(String[] args) {
        new MyHashMap().put("apple", 5);
    }
}