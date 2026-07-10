type File struct {
    Name string
    Size int
}
type Directory struct {
    Name    string
    Files   []File
    Subdirs []Directory
}
// Requires manual multi-slice iteration
func CalcSize(d Directory) int {
    size := 0
    for _, f := range d.Files { size += f.Size }
    for _, sub := range d.Subdirs { size += CalcSize(sub) }
    return size
}