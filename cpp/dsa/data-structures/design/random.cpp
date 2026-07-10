class RandomizedSet {
private:
    vector<int> nums;
    unordered_map<int, int> valToIndex;

public:
    RandomizedSet() { // @viz:init
    }
    
    bool insert(int val) { // @viz:insert_start
        if (valToIndex.find(val) != valToIndex.end()) { // @viz:insert_check
            return false; // @viz:insert_exists
        }
        
        valToIndex[val] = nums.size(); // @viz:insert_map
        nums.push_back(val); // @viz:insert_list
        return true; // @viz:insert_done
    }
    
    bool remove(int val) { // @viz:remove_start
        if (valToIndex.find(val) == valToIndex.end()) { // @viz:remove_check
            return false; // @viz:remove_not_found
        }
        
        int index = valToIndex[val]; // @viz:remove_get_index
        int lastVal = nums.back();
        
        nums[index] = lastVal; // @viz:remove_swap
        valToIndex[lastVal] = index; // @viz:remove_update_map
        
        nums.pop_back(); // @viz:remove_pop
        valToIndex.erase(val); // @viz:remove_delete_map
        
        return true; // @viz:remove_done
    }
    
    int getRandom() { // @viz:random_start
        return nums[rand() % nums.size()]; // @viz:random_pick
    } // @viz:random_done
}; // @viz:finish