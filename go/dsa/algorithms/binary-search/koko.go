func minEatingSpeed(piles []int, h int) int {
    left, right := 1, 0
    for _, pile := range piles {
        if pile > right {
            right = pile
        }
    }
    result := right

    for left <= right {
        mid := left + (right - left) / 2
        
        hours := 0
        for _, pile := range piles {
            hours += (pile + mid - 1) / mid
        }

        if hours <= h {
            result = mid
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return result
}