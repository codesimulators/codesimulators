type ProductIterator struct {
    products []string
    index    int
}
func (it *ProductIterator) HasNext() bool { ... }