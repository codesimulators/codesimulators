// 1) the new product — just one more class behind the interface
class SlackNotifier implements Notifier {
  send(msg: string) { return "Slack: " + msg; }
}

// 2) one new line inside the factory (the ONLY edit to existing code):
//      case "slack": return new SlackNotifier();

// 3) every caller stays exactly as it was — no edits anywhere:
const notifier = createNotifier(user.channel);   // "email" | "sms" | "slack"
notifier.send("Your order shipped");