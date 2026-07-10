type DirectoryComposite struct {
    name     string
    children []FileSystemNode
}
func (d *DirectoryComposite) GetName() string { return d.name }
func (d *DirectoryComposite) Add(node FileSystemNode) {
    d.children = append(d.children, node)
}
func (d *DirectoryComposite) GetSize() int {
    sum := 0
    for _, node := range d.children {
        sum += node.GetSize()
    }
    return sum
}