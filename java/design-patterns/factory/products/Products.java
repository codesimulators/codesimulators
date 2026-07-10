class EmailNotifier implements Notifier {
    public String send(String msg) { return "Email: " + msg; }
}
class SmsNotifier implements Notifier {
    public String send(String msg) { return "SMS: " + msg; }
}