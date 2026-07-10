class OrderService {
  notify(user: User, msg: string) {
    // ❌ the "which class?" decision is made right here, inline
    const notifier = user.prefersSms
      ? new SmsNotifier()
      : new EmailNotifier();
    notifier.send(msg);
  }
}

class BillingService {
  remind(user: User, msg: string) {
    // ❌ ...and copy-pasted again here, a little differently
    const notifier = user.prefersSms ? new SmsNotifier() : new EmailNotifier();
    notifier.send(msg);
  }
}
// Adding a Slack channel means editing BOTH of these — and every other
// service that ever constructed a notifier.