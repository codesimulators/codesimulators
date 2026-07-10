type Tree struct {
    X, Y int
    Type *TreeType
}
func (t *Tree) Draw() {
    t.Type.Draw(t.X, t.Y)
}