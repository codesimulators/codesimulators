class RandomizedSet {
  constructor() { // @viz:init
    this.nums = [];
    this.valToIndex = new Map();
  }

  insert(val) { // @viz:insert_start
    if (this.valToIndex.has(val)) { // @viz:insert_check
      return false; // @viz:insert_exists
    }
    
    this.valToIndex.set(val, this.nums.length); // @viz:insert_map
    this.nums.push(val); // @viz:insert_list
    return true; // @viz:insert_done
  }

  remove(val) { // @viz:remove_start
    if (!this.valToIndex.has(val)) { // @viz:remove_check
      return false; // @viz:remove_not_found
    }
    
    const index = this.valToIndex.get(val); // @viz:remove_get_index
    const lastVal = this.nums[this.nums.length - 1];
    
    // Move last element to the index of element to delete
    this.nums[index] = lastVal; // @viz:remove_swap
    this.valToIndex.set(lastVal, index); // @viz:remove_update_map
    
    // Pop the last element
    this.nums.pop(); // @viz:remove_pop
    this.valToIndex.delete(val); // @viz:remove_delete_map
    
    return true; // @viz:remove_done
  }

  getRandom() { // @viz:random_start
    const randomIndex = Math.floor(Math.random() * this.nums.length); // @viz:random_pick
    return this.nums[randomIndex]; // @viz:random_done
  }
} // @viz:finish