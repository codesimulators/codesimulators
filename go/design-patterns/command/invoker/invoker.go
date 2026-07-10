type RemoteControl struct {
    history []Command
}
func (r *RemoteControl) Execute(c Command) {
    c.Execute()
    r.history = append(r.history, c)
}