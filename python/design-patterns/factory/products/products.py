class EmailNotifier(Notifier):
    def send(self, msg): return "Email: " + msg

class SmsNotifier(Notifier):
    def send(self, msg): return "SMS: " + msg

class PushNotifier(Notifier):
    def send(self, msg): return "Push: " + msg