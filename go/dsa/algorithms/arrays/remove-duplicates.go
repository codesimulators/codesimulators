func removeDuplicates(nums []int) int {
    if len(nums) == 0 { return 0 }
    k := 0 // index of the current last unique element
    for i := 1; i < len(nums); i++ {
        if nums[i] != nums[k] { // check against last unique value
            k++ // move to next free unique slot
            nums[k] = nums[i] // store new unique value
        }
    }
    return k + 1 // return total count of unique elements
}