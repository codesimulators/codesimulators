// 1) the new product — just one more class
class SlackNotifier : public Notifier {
public:
    std::string send(std::string m) override { return "Slack: " + m; }
};

// 2) one new line in createNotifier():
//      if (channel == "slack") return std::make_unique<SlackNotifier>();

// 3) every caller stays exactly as it was:
auto n = createNotifier(user.channel);
n->send("Your order shipped");