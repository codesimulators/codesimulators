type LegacyBankAdapter struct{ bank LegacyBank }

func (a LegacyBankAdapter) Pay(amountUsd float64) (bool, string) {
    cents := int(amountUsd*100 + 0.5)
    status, txn := a.bank.MakePayment(cents, "USD")
    return status == 0, txn
}