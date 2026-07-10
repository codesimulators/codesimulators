func leastInterval(tasks []byte, n int) int {
    freq := [26]int{}
    for _, t := range tasks {
        freq[t-'A']++
    }
    h := &MaxHeap{}
    for _, f := range freq {
        if f > 0 {
            heap.Push(h, f)
        }
    }
    time := 0
    for h.Len() > 0 {
        var temp []int
        for i := 0; i <= n; i++ {
            if h.Len() > 0 {
                temp = append(temp, heap.Pop(h).(int)-1)
            }
        }
        for _, t := range temp {
            if t > 0 {
                heap.Push(h, t)
            }
        }
        if h.Len() == 0 { time += len(temp) } else { time += n + 1 }
    }
    return time
}