type Book struct {
    Price, Weight float64
}
// ❌ Coupled method structures
func (b *Book) CalcTax() float64 { return b.Price * 0.05 }