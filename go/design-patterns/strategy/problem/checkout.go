func Charge(amount float64, method string) (float64, error) {
    if method == "card" {
        fee := amount*0.029 + 0.30
        return amount + fee, nil
    } else if method == "paypal" {
        fee := amount*0.0349 + 0.49
        return amount + fee, nil
    } else if method == "crypto" {
        fee := amount * 0.01
        return amount + fee, nil
    }
    return 0, fmt.Errorf("unknown method: %s", method)
}