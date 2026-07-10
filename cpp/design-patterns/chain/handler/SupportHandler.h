class SupportHandler {
    SupportHandler* next = nullptr;
public:
    virtual ~SupportHandler() = default;
    SupportHandler* setNext(SupportHandler* handler) {
        next = handler;
        return handler;
    }
    void handle(Ticket* t) {
        if (canHandle(t)) resolve(t);
        else if (next) next->handle(t);
    }
protected:
    virtual bool canHandle(Ticket* t) = 0;
    virtual void resolve(Ticket* t) = 0;
};