func compareVersion(v1 string, v2 string) int {
    nums1 := strings.Split(v1, ".")
    nums2 := strings.Split(v2, ".")
    length := len(nums1); if len(nums2) > length { length = len(nums2) }
    
    for i := 0; i < length; i++ {
        var n1, n2 int
        if i < len(nums1) { n1, _ = strconv.Atoi(nums1[i]) }
        if i < len(nums2) { n2, _ = strconv.Atoi(nums2[i]) }
        
        if n1 < n2 {
            return -1
        }
        if n1 > n2 {
            return 1
        }
    }
    return 0
}