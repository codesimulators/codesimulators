type Editor struct {
    Text   string // ❌ fields must be exported for history managers
    Cursor int
}