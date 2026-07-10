class OrderService:
    def notify(self, user, msg):
        # ❌ the "which class?" decision is made right here, inline
        notifier = SmsNotifier() if user.prefers_sms else EmailNotifier()
        notifier.send(msg)

class BillingService:
    def remind(self, user, msg):
        # ❌ ...and copy-pasted again here
        notifier = SmsNotifier() if user.prefers_sms else EmailNotifier()
        notifier.send(msg)

# Adding Slack means editing BOTH services — and every other one like them.