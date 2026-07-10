type SupportHandler interface {
    SetNext(handler SupportHandler) SupportHandler
    Handle(ticket *Ticket)
}