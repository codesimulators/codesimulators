void OrderService::notify(const User& user, const std::string& msg) {
    // ❌ the "which class?" decision is made right here, inline
    std::unique_ptr<Notifier> notifier = user.prefersSms
        ? std::unique_ptr<Notifier>(new SmsNotifier())
        : std::unique_ptr<Notifier>(new EmailNotifier());
    notifier->send(msg);
}

void BillingService::remind(const User& user, const std::string& msg) {
    // ❌ ...and copy-pasted again here
    std::unique_ptr<Notifier> notifier = user.prefersSms
        ? std::unique_ptr<Notifier>(new SmsNotifier())
        : std::unique_ptr<Notifier>(new EmailNotifier());
    notifier->send(msg);
}