// Each product is its own small class.
class EmailNotifier implements Notifier {
  send(msg: string) { return "Email: " + msg; }
}
class SmsNotifier implements Notifier {
  send(msg: string) { return "SMS: " + msg; }
}
class PushNotifier implements Notifier {
  send(msg: string) { return "Push: " + msg; }
}