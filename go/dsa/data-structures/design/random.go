type RandomizedSet struct {
    nums       []int
    valToIndex map[int]int
}

func Constructor() RandomizedSet { // @viz:init
    return RandomizedSet{
        nums:       []int{},
        valToIndex: make(map[int]int),
    }
}

func (this *RandomizedSet) Insert(val int) bool { // @viz:insert_start
    if _, exists := this.valToIndex[val]; exists { // @viz:insert_check
        return false // @viz:insert_exists
    }
    this.valToIndex[val] = len(this.nums) // @viz:insert_map
    this.nums = append(this.nums, val) // @viz:insert_list
    return true // @viz:insert_done
}

func (this *RandomizedSet) Remove(val int) bool { // @viz:remove_start
    index, exists := this.valToIndex[val] // @viz:remove_check
    if !exists { // @viz:remove_not_found
        return false
    }
    
    lastVal := this.nums[len(this.nums)-1]
    this.nums[index] = lastVal // @viz:remove_swap
    this.valToIndex[lastVal] = index // @viz:remove_update_map
    
    this.nums = this.nums[:len(this.nums)-1] // @viz:remove_pop
    delete(this.valToIndex, val) // @viz:remove_delete_map
    return true // @viz:remove_done
}

func (this *RandomizedSet) GetRandom() int { // @viz:random_start
    return this.nums[rand.Intn(len(this.nums))] // @viz:random_pick
} // @viz:random_done
