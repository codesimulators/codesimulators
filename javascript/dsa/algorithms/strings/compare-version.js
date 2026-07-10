function compareVersion(v1, v2) {
  const nums1 = v1.split('.');
  const nums2 = v2.split('.');
  const len = Math.max(nums1.length, nums2.length);
  
  for (let i = 0; i < len; i++) {
    const n1 = i < nums1.length ? parseInt(nums1[i]) : 0;
    const n2 = i < nums2.length ? parseInt(nums2[i]) : 0;
    
    if (n1 < n2) {
      return -1;
    }
    if (n1 > n2) {
      return 1;
    }
  }
  return 0;
}