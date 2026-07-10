func (c *Checkout) Buy(amountUsd float64) (string, error) {
    // ❌ each caller must remember the quirks by hand:
    cents := int(amountUsd*100 + 0.5)                 // dollars -> cents
    status, txn := c.bank.MakePayment(cents, "USD")
    if status != 0 {                                  // 0 means success (?!)
        return "", errors.New("declined")
    }
    return txn, nil
}

func (r *Refunds) Refund(amountUsd float64) bool {
    // ❌ ...and the SAME conversion is copy-pasted here:
    cents := int(amountUsd*100 + 0.5)
    status, _ := r.bank.MakePayment(-cents, "USD")
    return status == 0
}