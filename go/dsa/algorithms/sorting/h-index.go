func hIndex(citations []int) int {
	n := len(citations)
	buckets := make([]int, n+1)
	
	for _, c := range citations {
		if c >= n {
			buckets[n]++
		} else {
			buckets[c]++
		}
	}
	
	papersSeen := 0
	for h := n; h >= 0; h-- {
		papersSeen += buckets[h]
		if papersSeen >= h {
			return h
		}
	}
	return 0
}