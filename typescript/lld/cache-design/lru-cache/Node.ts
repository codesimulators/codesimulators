// One entry's position in the recency order. prev/next make this an
// intrusive doubly linked list node — no separate list container needed.
export class Node<K, V> {
    prev: Node<K, V> | null = null;
    next: Node<K, V> | null = null;
    constructor(public key: K, public value: V) {}
}