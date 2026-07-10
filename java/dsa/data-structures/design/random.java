class RandomizedSet {
    List<Integer> nums;
    Map<Integer, Integer> valToIndex;
    Random rand;

    public RandomizedSet() { // @viz:init
        nums = new ArrayList<>();
        valToIndex = new HashMap<>();
        rand = new Random();
    }

    public boolean insert(int val) { // @viz:insert_start
        if (valToIndex.containsKey(val)) { // @viz:insert_check
            return false; // @viz:insert_exists
        }
        
        valToIndex.put(val, nums.size()); // @viz:insert_map
        nums.add(val); // @viz:insert_list
        return true; // @viz:insert_done
    }

    public boolean remove(int val) { // @viz:remove_start
        if (!valToIndex.containsKey(val)) { // @viz:remove_check
            return false; // @viz:remove_not_found
        }
        
        int index = valToIndex.get(val); // @viz:remove_get_index
        int lastVal = nums.get(nums.size() - 1);
        
        // Swap with last
        nums.set(index, lastVal); // @viz:remove_swap
        valToIndex.put(lastVal, index); // @viz:remove_update_map
        
        // Remove
        nums.remove(nums.size() - 1); // @viz:remove_pop
        valToIndex.remove(val); // @viz:remove_delete_map
        
        return true; // @viz:remove_done
    }

    public int getRandom() { // @viz:random_start
        return nums.get(rand.nextInt(nums.size())); // @viz:random_pick
    } // @viz:random_done
} // @viz:finish