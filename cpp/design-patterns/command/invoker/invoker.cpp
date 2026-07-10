class RemoteControl {
    std::vector<Command*> history;
public:
    void execute(Command* c) {
        c->execute();
        history.push_back(c);
    }
};