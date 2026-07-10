import time
from kv_store import KVStore
from sweeper import Sweeper

store = KVStore()
sweeper = Sweeper(store)

store.set("session:9", "alice", 50)    # expires in 50ms
store.set("cache:x", "result", 500)     # expires in 500ms

print(store.get("session:9"))            # alice

time.sleep(0.1)
sweeper.tick(time.time() * 1000)          # proactively reclaims session:9
print(store.get("session:9"))             # None — expired and swept
print(store.get("cache:x"))               # result — untouched