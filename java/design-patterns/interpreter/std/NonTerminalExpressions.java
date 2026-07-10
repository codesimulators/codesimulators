class AddExpression implements Expression {
    private Expression left, right;
    public AddExpression(Expression l, Expression r) { left = l; right = r; }
    public double interpret(Map<String, Double> ctx) {
        return left.interpret(ctx) + right.interpret(ctx);
    }
}