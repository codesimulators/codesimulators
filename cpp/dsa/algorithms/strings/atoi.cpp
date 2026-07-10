int myAtoi(string s) {
    int i = 0, sign = 1;
    long res = 0;
    while (i < s.length() && s[i] == ' ') i++;
    if (i < s.length() && (s[i] == '+' || s[i] == '-')) {
        sign = (s[i++] == '+') ? 1 : -1;
    }
    while (i < s.length() && isdigit(s[i])) {
        res = res * 10 + (s[i++] - '0');
        if (res * sign >= INT_MAX)
            return INT_MAX;
        if (res * sign <= INT_MIN)
            return INT_MIN;
    }
    return (int)(res * sign);
}