public interface Expression {
    double interpret(Map<String, Double> context);
}