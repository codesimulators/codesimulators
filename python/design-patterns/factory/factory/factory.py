def create_notifier(channel: str) -> Notifier:
    return {
        "email": EmailNotifier,
        "sms": SmsNotifier,
        "push": PushNotifier,
    }[channel]()

create_notifier("sms").send("Your order shipped")