def compareVersion(v1: str, v2: str) -> int:
    nums1 = v1.split('.')
    nums2 = v2.split('.')
    n, m = len(nums1), len(nums2)
    
    for i in range(max(n, m)):
        i1 = int(nums1[i]) if i < n else 0
        i2 = int(nums2[i]) if i < m else 0
        
        if i1 < i2:
            return -1
        if i1 > i2:
            return 1
            
    return 0