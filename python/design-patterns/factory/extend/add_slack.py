# 1) the new product — just one more class
class SlackNotifier(Notifier):
    def send(self, msg): return "Slack: " + msg

# 2) one new entry in the factory's map:
#      "slack": SlackNotifier,

# 3) every caller stays exactly as it was:
create_notifier(user.channel).send("Your order shipped")