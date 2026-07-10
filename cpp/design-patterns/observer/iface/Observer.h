class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(double price) = 0;
};