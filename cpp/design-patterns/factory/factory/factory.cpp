std::unique_ptr<Notifier> createNotifier(const std::string& channel) {
    if (channel == "email") return std::make_unique<EmailNotifier>();
    if (channel == "sms")   return std::make_unique<SmsNotifier>();
    throw std::invalid_argument("unknown channel");
}