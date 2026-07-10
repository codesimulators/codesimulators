class NumberExpression : public Expression {
    double value;
public:
    NumberExpression(double v) : value(v) {}
    double interpret(const std::unordered_map<std::string, double>& ctx) override { return value; }
};