class BotHandler : public SupportHandler {
protected:
    bool canHandle(Ticket* t) override { return t->severity == 1; }
    void resolve(Ticket* t) override { std::cout << "Bot resolved\\n"; }
};