import { LRUCache } from './LRUCache';

const cache = new LRUCache<string, number>(3);
cache.put('A', 1);
cache.put('B', 2);
cache.put('C', 3);         // cache: [C, B, A]

cache.get('A');             // cache: [A, C, B] — A moved to the front

cache.put('D', 4);          // over capacity → evict B (the tail)
console.log(cache.get('B'));   // undefined — evicted
console.log(cache.get('D'));   // 4