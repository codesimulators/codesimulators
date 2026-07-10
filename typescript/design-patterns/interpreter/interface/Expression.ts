// Expression Interface: Evaluates formulas based on variable context bindings
interface Expression {
  interpret(context: Map<string, number>): number;
}