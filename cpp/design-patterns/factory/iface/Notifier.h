class Notifier {
public:
    virtual ~Notifier() = default;
    virtual std::string send(std::string msg) = 0;
};