type Aircraft struct {
    ID    string
    Peers []*Aircraft // ❌ direct coupling
}