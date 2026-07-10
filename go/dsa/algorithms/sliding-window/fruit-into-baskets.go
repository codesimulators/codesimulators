func totalFruit(fruits []int) int {
    count := make(map[int]int)
    left, res := 0, 0

    for right, f := range fruits {
        // 1️⃣ Expand
        count[f]++

        // 2️⃣ Condition: while invalid
        for len(count) > 2 {
            // 3️⃣ Contract
            count[fruits[left]]--
            if count[fruits[left]] == 0 {
                delete(count, fruits[left])
            }
            left++
        }

        // 4️⃣ Record / Optimize
        if right - left + 1 > res {
            res = right - left + 1
        }
    }

    return res
}