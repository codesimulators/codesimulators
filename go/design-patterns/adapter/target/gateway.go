type PaymentGateway interface {
    Pay(amountUsd float64) (ok bool, ref string)
}