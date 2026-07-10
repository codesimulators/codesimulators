class NumberExpression implements Expression {
    private double value;
    public NumberExpression(double v) { this.value = v; }
    public double interpret(Map<String, Double> ctx) { return value; }
}
class VariableExpression implements Expression {
    private String name;
    public VariableExpression(String n) { this.name = n; }
    public double interpret(Map<String, Double> ctx) { return ctx.get(name); }
}