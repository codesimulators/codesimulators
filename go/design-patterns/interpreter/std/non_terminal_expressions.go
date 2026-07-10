type Add struct { Left, Right Expression }
func (a *Add) Interpret(ctx map[string]float64) float64 {
    return a.Left.Interpret(ctx) + a.Right.Interpret(ctx)
}