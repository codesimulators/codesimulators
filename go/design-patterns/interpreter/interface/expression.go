type Expression interface {
    Interpret(context map[string]float64) float64
}