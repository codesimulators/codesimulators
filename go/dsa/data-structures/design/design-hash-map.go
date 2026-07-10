type entry struct {
    key, val int
}

type MyHashMap struct {
    buckets [][]entry
    size    int
}

func Constructor() MyHashMap { // @viz:init
    size := 8
    return MyHashMap{
        buckets: make([][]entry, size),
        size:    size,
    }
}

func (this *MyHashMap) Put(key int, value int) { // @viz:put_start
    h := key % this.size // @viz:hash
    bucket := &this.buckets[h] // @viz:put_bucket
    for i := range *bucket { // @viz:check_exists
        if (*bucket)[i].key == key { // @viz:check_key
            (*bucket)[i].val = value // @viz:update
            return // @viz:put_return
        }
    }
    *bucket = append(*bucket, entry{key, value}) // @viz:insert
}

func (this *MyHashMap) Get(key int) int { // @viz:get_start
    h := key % this.size // @viz:get_hash
    bucket := this.buckets[h] // @viz:get_bucket
    for i := range bucket { // @viz:get_search
        if bucket[i].key == key { // @viz:get_check_key
            return bucket[i].val // @viz:get_found
        }
    }
    return -1 // @viz:get_not_found
}

func (this *MyHashMap) Remove(key int) { // @viz:remove_start
    h := key % this.size // @viz:remove_hash
    bucket := &this.buckets[h] // @viz:remove_bucket
    for i := range *bucket { // @viz:remove_search
        if (*bucket)[i].key == key { // @viz:remove_check_key
            *bucket = append((*bucket)[:i], (*bucket)[i+1:]...) // @viz:remove_done
            return // @viz:remove_return
        }
    }
    // Not found // @viz:remove_not_found
} // @viz:finish