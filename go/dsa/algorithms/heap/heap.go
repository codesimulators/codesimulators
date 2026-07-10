func findKthLargest(nums []int, k int) int {
    h := &MinHeap{}
    heap.Init(h)
    for _, num := range nums {
        heap.Push(h, num)
        if h.Len() > k {
            heap.Pop(h)
        }
    }
    return (*h)[0]
}