// 1) the new product — just one more class
class SlackNotifier implements Notifier {
    public String send(String msg) { return "Slack: " + msg; }
}

// 2) one new case in NotifierFactory.create():
//      case "slack": return new SlackNotifier();

// 3) every caller stays exactly as it was:
Notifier n = NotifierFactory.create(user.channel);
n.send("Your order shipped");