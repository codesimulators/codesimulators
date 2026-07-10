func mergeSort(arr []int, l, r int) {
	if l >= r {
		return
	}
	m := l + (r-l)/2
	mergeSort(arr, l, m)
	mergeSort(arr, m+1, r)
	merge(arr, l, m, r)
}

func merge(arr []int, l, m, r int) {
	n1, n2 := m-l+1, r-m
	L := make([]int, n1)
	R := make([]int, n2)
	for i := 0; i < n1; i++ { L[i] = arr[l+i] }
	for j := 0; j < n2; j++ { R[j] = arr[m+1+j] }
	i, j, k := 0, 0, l

	for i < n1 && j < n2 {
		if L[i] <= R[j] {
			arr[k] = L[i]
			i++
		} else {
			arr[k] = R[j]
			j++
		}
		k++
	}

	for i < n1 {
		arr[k] = L[i]
		i++
		k++
	}

	for j < n2 {
		arr[k] = R[j]
		j++
		k++
	}
}