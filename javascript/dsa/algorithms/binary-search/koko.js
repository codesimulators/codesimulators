function minEatingSpeed(piles, h) {
    let left = 1;
    let right = Math.max(...piles);
    let result = right;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        let hours = 0;
        for (const pile of piles) {
            hours += Math.ceil(pile / mid);
        }

        if (hours <= h) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
}