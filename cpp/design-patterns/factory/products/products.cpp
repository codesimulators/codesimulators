class EmailNotifier : public Notifier {
public:
    std::string send(std::string m) override { return "Email: " + m; }
};
class SmsNotifier : public Notifier {
public:
    std::string send(std::string m) override { return "SMS: " + m; }
};