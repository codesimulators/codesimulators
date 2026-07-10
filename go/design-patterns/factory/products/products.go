type EmailNotifier struct{}
func (EmailNotifier) Send(m string) string { return "Email: " + m }

type SmsNotifier struct{}
func (SmsNotifier) Send(m string) string { return "SMS: " + m }