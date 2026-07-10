func CreateNotifier(channel string) (Notifier, error) {
    switch channel {
    case "email":
        return EmailNotifier{}, nil
    case "sms":
        return SmsNotifier{}, nil
    default:
        return nil, fmt.Errorf("unknown channel: %s", channel)
    }
}