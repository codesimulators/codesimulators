type Number struct { Value float64 }
func (n *Number) Interpret(ctx map[string]float64) float64 { return n.Value }