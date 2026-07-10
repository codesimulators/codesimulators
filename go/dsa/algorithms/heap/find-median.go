type MedianFinder struct {
    maxH MaxHeap
    minH MinHeap
}
func (mf *MedianFinder) AddNum(num int) {
    heap.Push(&mf.maxH, num)
    if mf.minH.Len() > 0 && mf.maxH[0] > mf.minH[0] {
        heap.Push(&mf.minH, heap.Pop(&mf.maxH))
    }
    if mf.maxH.Len() > mf.minH.Len()+1 {
        heap.Push(&mf.minH, heap.Pop(&mf.maxH))
    }
    else if mf.minH.Len() > mf.maxH.Len() {
        heap.Push(&mf.maxH, heap.Pop(&mf.minH))
    }
}
func (mf *MedianFinder) FindMedian() float64 {
    if mf.maxH.Len() > mf.minH.Len() {
        return float64(mf.maxH[0])
    }
    return float64(mf.maxH[0]+mf.minH[0]) / 2.0
}