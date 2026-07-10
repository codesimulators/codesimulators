type FileLeaf struct {
    name string
    size int
}
func (f *FileLeaf) GetName() string { return f.name }
func (f *FileLeaf) GetSize() int    { return f.size }