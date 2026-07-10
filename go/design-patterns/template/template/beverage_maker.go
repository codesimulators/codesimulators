// Go uses composition to simulate template method pattern
type BeverageMaker struct {
    Brew          func()
    AddCondiments func()
}
func (b *BeverageMaker) PrepareRecipe() {
    fmt.Println("Boiling water...")
    b.Brew()
    fmt.Println("Pouring in cup...")
    b.AddCondiments()
}