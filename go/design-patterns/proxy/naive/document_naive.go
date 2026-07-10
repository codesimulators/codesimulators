type Document struct{ images []*RealImage }

func NewDocument(files []string) *Document {
    d := &Document{}
    // ❌ every image decodes NOW, even ones never viewed
    for _, f := range files {
        d.images = append(d.images, NewRealImage(f)) // ~24MB EACH
    }
    return d
}
// NewDocument(fiftyFiles) -> 50 decodes up front.