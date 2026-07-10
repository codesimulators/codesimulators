type Command interface {
    Execute()
    Undo()
}