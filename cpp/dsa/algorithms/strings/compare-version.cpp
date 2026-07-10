int compareVersion(string v1, string v2) {
    int i = 0, j = 0;
    while (i < v1.length() || j < v2.length()) {
        long n1 = 0, n2 = 0;
        while (i < v1.length() && v1[i] != '.') {
            n1 = n1 * 10 + (v1[i++] - '0');
        }
        while (j < v2.length() && v2[j] != '.') {
            n2 = n2 * 10 + (v2[j++] - '0');
        }
        
        if (n1 < n2) {
            return -1;
        }
        if (n1 > n2) {
            return 1;
        }
        i++; j++;
    }
    return 0;
}