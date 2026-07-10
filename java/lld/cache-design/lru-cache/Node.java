// One entry's position in the recency order. prev/next make this an
// intrusive doubly linked list node — no separate list container needed.
class Node<K, V> {
    K key;
    V value;
    Node<K, V> prev, next;

    Node(K key, V value) { this.key = key; this.value = value; }
}