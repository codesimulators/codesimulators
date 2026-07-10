func myAtoi(s string) int {
    s = strings.TrimSpace(s)
    if len(s) == 0 {
        return 0
    }
    sign, i, res := 1, 0, 0
    if s[i] == '+' || s[i] == '-' {
        if s[i] == '-' { sign = -1 }
        i++
    }
    for i < len(s) && unicode.IsDigit(rune(s[i])) {
        res = res * 10 + int(s[i] - '0')
        if res * sign > 2147483647 {
            return 2147483647
        }
        if res * sign < -2147483648 {
            return -2147483648
        }
        i++
    }
    return res * sign
}