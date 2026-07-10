class MyHashMap {
  constructor() { // @viz:init
    this.size = 8;
    this.buckets = Array.from({ length: this.size }, () => []);
  }

  hash(key) {
    return key % this.size;
  }

  put(key, value) { // @viz:put_start
    const idx = this.hash(key); // @viz:hash
    const bucket = this.buckets[idx]; // @viz:put_bucket
    for (let i = 0; i < bucket.length; i++) { // @viz:check_exists
      if (bucket[i][0] === key) { // @viz:check_key
        bucket[i][1] = value; // @viz:update
        return; // @viz:put_return
      }
    }
    bucket.push([key, value]); // @viz:insert
  }

  get(key) { // @viz:get_start
    const idx = this.hash(key); // @viz:get_hash
    const bucket = this.buckets[idx]; // @viz:get_bucket
    for (let i = 0; i < bucket.length; i++) { // @viz:get_search
      if (bucket[i][0] === key) { // @viz:get_check_key
        return bucket[i][1]; // @viz:get_found
      }
    }
    return -1; // @viz:get_not_found
  }

  remove(key) { // @viz:remove_start
    const idx = this.hash(key); // @viz:remove_hash
    const bucket = this.buckets[idx]; // @viz:remove_bucket
    for (let i = 0; i < bucket.length; i++) { // @viz:remove_search
      if (bucket[i][0] === key) { // @viz:remove_check_key
        bucket.splice(i, 1); // @viz:remove_done
        return; // @viz:remove_return
      }
    }
    // Not found // @viz:remove_not_found
  }
} // @viz:finish