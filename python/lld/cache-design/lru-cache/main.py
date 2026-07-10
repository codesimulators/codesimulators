from lru_cache import LRUCache

cache = LRUCache(3)
cache.put("A", 1)
cache.put("B", 2)
cache.put("C", 3)           # cache: [C, B, A]

cache.get("A")               # cache: [A, C, B] — A moved to the front

cache.put("D", 4)            # over capacity -> evict B (the tail)
print(cache.get("B"))          # None — evicted
print(cache.get("D"))          # 4