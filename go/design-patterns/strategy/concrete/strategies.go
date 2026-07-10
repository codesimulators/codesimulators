type CardStrategy struct{}
func (CardStrategy) Charge(amount float64) float64 {
    return amount + amount*0.029 + 0.30
}

type PaypalStrategy struct{}
func (PaypalStrategy) Charge(amount float64) float64 {
    return amount + amount*0.0349 + 0.49
}

type CryptoStrategy struct{}
func (CryptoStrategy) Charge(amount float64) float64 {
    return amount + amount*0.01 // 1% network fee
}