// 1) the new product — just one more type
type SlackNotifier struct{}
func (SlackNotifier) Send(m string) string { return "Slack: " + m }

// 2) one new case in CreateNotifier():
//      case "slack": return SlackNotifier{}, nil

// 3) every caller stays exactly as it was:
n, _ := CreateNotifier(user.Channel)
n.Send("Your order shipped")