type LightOnCommand struct {
    light *Light
}
func (c *LightOnCommand) Execute() { c.light.TurnOn() }
func (c *LightOnCommand) Undo()    { c.light.TurnOff() }