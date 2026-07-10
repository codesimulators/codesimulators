// In Go the contract is just an interface.
type PaymentStrategy interface {
    Charge(amount float64) float64
}