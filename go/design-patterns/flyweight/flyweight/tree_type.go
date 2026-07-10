type TreeType struct {
    Name        string
    Color       string
    TextureData []byte // Allocated once
}
func (t *TreeType) Draw(x, y int) { ... }