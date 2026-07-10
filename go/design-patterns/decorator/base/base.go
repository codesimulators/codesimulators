type Espresso struct{}
func (Espresso) Cost() float64    { return 2.0 }
func (Espresso) Describe() string { return "Espresso" }

// Base decorator that toppings embed (Go's stand-in for "extends").
type AddOn struct{ inner Beverage }