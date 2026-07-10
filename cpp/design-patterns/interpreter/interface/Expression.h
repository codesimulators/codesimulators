class Expression {
public:
    virtual ~Expression() = default;
    virtual double interpret(const std::unordered_map<std::string, double>& context) = 0;
};