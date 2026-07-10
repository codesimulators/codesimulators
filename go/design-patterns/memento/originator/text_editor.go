type Editor struct {
    text string
}
func (e *Editor) Save() *Memento {
    return &Memento{state: e.text}
}
func (e *Editor) Restore(m *Memento) {
    e.text = m.state
}