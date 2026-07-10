func topKFrequent(nums []int, k int) []int {
    freq := make(map[int]int)
    for _, n := range nums {
        freq[n]++
    }
    h := &MinHeap{}
    heap.Init(h)
    for num, cnt := range freq {
        heap.Push(h, [2]int{cnt, num})
        if h.Len() > k { heap.Pop(h) }
    }
    res := make([]int, 0, k)
    for h.Len() > 0 {
        res = append(res, heap.Pop(h).([2]int)[1])
    }
    return res
}