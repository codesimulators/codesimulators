class OrderService {
    void notify(User user, String msg) {
        // ❌ the "which class?" decision is made right here, inline
        Notifier notifier = user.prefersSms
            ? new SmsNotifier()
            : new EmailNotifier();
        notifier.send(msg);
    }
}

class BillingService {
    void remind(User user, String msg) {
        // ❌ ...and copy-pasted again here
        Notifier notifier = user.prefersSms ? new SmsNotifier() : new EmailNotifier();
        notifier.send(msg);
    }
}
// Adding Slack means editing BOTH services.