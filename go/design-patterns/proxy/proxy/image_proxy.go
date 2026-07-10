type ImageProxy struct {
    file string
    real *RealImage
}
func (p *ImageProxy) Display() string {
    if p.real == nil {
        p.real = NewRealImage(p.file) // lazy
    }
    return p.real.Display()
}