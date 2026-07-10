class NotifierFactory {
    static Notifier create(String channel) {
        switch (channel) {
            case "email": return new EmailNotifier();
            case "sms":   return new SmsNotifier();
            default: throw new IllegalArgumentException(channel);
        }
    }
}

Notifier n = NotifierFactory.create("sms");
n.send("Your order shipped");