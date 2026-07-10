func frequencySort(s string) string {
	counts := make(map[rune]int)
	for _, char := range s {
		counts[char]++
	}
	
	n := len(s)
	buckets := make([][]rune, n+1)
	for char, freq := range counts {
		buckets[freq] = append(buckets[freq], char)
	}
	
	res := []rune{}
	for f := n; f >= 1; f-- {
		for _, char := range buckets[f] {
			for i := 0; i < f; i++ {
				res = append(res, char)
			}
		}
	}
	return string(res)
}