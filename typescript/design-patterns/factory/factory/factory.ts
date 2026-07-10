// One place owns the "which class" decision.
function createNotifier(channel: string): Notifier {
  switch (channel) {
    case "email": return new EmailNotifier();
    case "sms":   return new SmsNotifier();
    case "push":  return new PushNotifier();
    default: throw new Error("Unknown channel: " + channel);
  }
}

// Callers never use 'new' directly — they ask the factory.
const notifier = createNotifier("sms");
notifier.send("Your order shipped");   // SMS: Your order shipped