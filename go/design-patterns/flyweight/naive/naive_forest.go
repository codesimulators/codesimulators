type NaiveTree struct {
    Name        string
    Color       string
    TextureData []byte // ❌ Heavy binary assets duplicated per instance
    X, Y        int
}