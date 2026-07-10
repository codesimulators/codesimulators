type LegacyBank struct{}
func (LegacyBank) MakePayment(cents int, ccy string) (int, string) {
    return 0, fmt.Sprintf("LB-%d%s", cents, ccy)
}