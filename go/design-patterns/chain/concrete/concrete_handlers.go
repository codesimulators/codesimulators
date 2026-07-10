type BotHandler struct {
    next SupportHandler
}
func (b *BotHandler) Handle(t *Ticket) { ... }