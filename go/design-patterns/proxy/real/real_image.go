type RealImage struct{ file string }

func NewRealImage(f string) *RealImage {
    fmt.Println("loading", f) // heavy
    return &RealImage{file: f}
}
func (r *RealImage) Display() string { return "img " + r.file }