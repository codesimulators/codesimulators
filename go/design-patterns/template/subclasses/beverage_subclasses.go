func NewCoffee() *BeverageMaker {
    return &BeverageMaker{
        Brew:          func() { fmt.Println("Brewing coffee...") },
        AddCondiments: func() { fmt.Println("Adding sugar...") },
    }
}