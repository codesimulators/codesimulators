func (s *OrderService) Notify(user User, msg string) {
    // ❌ the "which class?" decision is made right here, inline
    var notifier Notifier
    if user.PrefersSms {
        notifier = SmsNotifier{}
    } else {
        notifier = EmailNotifier{}
    }
    notifier.Send(msg)
}

func (b *BillingService) Remind(user User, msg string) {
    // ❌ ...and copy-pasted again here
    var notifier Notifier
    if user.PrefersSms {
        notifier = SmsNotifier{}
    } else {
        notifier = EmailNotifier{}
    }
    notifier.Send(msg)
}