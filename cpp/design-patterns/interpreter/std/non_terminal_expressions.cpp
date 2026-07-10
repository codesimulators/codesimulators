class AddExpression : public Expression {
    Expression *left, *right;
public:
    AddExpression(Expression* l, Expression* r) : left(l), right(r) {}
    double interpret(const std::unordered_map<std::string, double>& ctx) override {
        return left->interpret(ctx) + right->interpret(ctx);
    }
};