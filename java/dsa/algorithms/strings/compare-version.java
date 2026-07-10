public int compareVersion(String v1, String v2) {
    String[] nums1 = v1.split("\\.");
    String[] nums2 = v2.split("\\.");
    int len = Math.max(nums1.length, nums2.length);
    
    for (int i = 0; i < len; i++) {
        int n1 = i < nums1.length ? Integer.parseInt(nums1[i]) : 0;
        int n2 = i < nums2.length ? Integer.parseInt(nums2[i]) : 0;
        
        if (n1 < n2) {
            return -1;
        }
        if (n1 > n2) {
            return 1;
        }
    }
    return 0;
}