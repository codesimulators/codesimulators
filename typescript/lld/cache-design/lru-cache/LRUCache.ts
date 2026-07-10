import { Node } from './Node';

// HashMap for O(1) lookup + a doubly linked list (via sentinel head/tail)
// for O(1) recency tracking. Neither structure alone solves this problem.
export class LRUCache<K, V> {
    private index = new Map<K, Node<K, V>>();
    private head: Node<K, V>;   // sentinel — head.next is the most recent
    private tail: Node<K, V>;   // sentinel — tail.prev is the least recent

    constructor(private capacity: number) {
        // sentinels never hold a real key/value — they only bracket the list
        this.head = new Node<K, V>(undefined as unknown as K, undefined as unknown as V);
        this.tail = new Node<K, V>(undefined as unknown as K, undefined as unknown as V);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: K): V | undefined {
        const node = this.index.get(key);
        if (!node) return undefined;
        this.moveToFront(node);
        return node.value;
    }

    put(key: K, value: V): void {
        const existing = this.index.get(key);
        if (existing) {
            existing.value = value;
            this.moveToFront(existing);
            return;
        }
        const node = new Node(key, value);
        this.index.set(key, node);
        this.addToFront(node);

        if (this.index.size > this.capacity) {
            const lru = this.tail.prev!;                 // sentinel-adjacent = truly least recent
            this.unlink(lru);
            this.index.delete(lru.key);
        }
    }

    private moveToFront(node: Node<K, V>): void {
        this.unlink(node);
        this.addToFront(node);
    }

    private addToFront(node: Node<K, V>): void {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    private unlink(node: Node<K, V>): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }
}