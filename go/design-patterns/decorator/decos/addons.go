// Go has no "extends" — each topping embeds the AddOn base instead.
type Milk struct{ AddOn }
func (m Milk) Cost() float64    { return m.inner.Cost() + 0.5 }
func (m Milk) Describe() string { return m.inner.Describe() + " + Milk" }

type Whip struct{ AddOn }
func (w Whip) Cost() float64    { return w.inner.Cost() + 0.7 }
func (w Whip) Describe() string { return w.inner.Describe() + " + Whip" }