def minEatingSpeed(piles, h):
    left, right = 1, max(piles)
    result = right

    while left <= right:
        mid = left + (right - left) // 2
        
        hours = 0
        for pile in piles:
            hours += (pile + mid - 1) // mid
            
        if hours <= h:
            result = mid
            right = mid - 1
        else:
            left = mid + 1
            
    return result