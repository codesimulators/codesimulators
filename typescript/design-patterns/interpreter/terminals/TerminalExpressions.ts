// NumberExpression (Terminal): returns static numbers directly
class NumberExpression implements Expression {
  constructor(private value: number) {}

  interpret() {
    return this.value;
  }
}

// VariableExpression (Terminal): looks up variables inside the context map
class VariableExpression implements Expression {
  constructor(private name: string) {}

  interpret(context: Map<string, number>): number {
    if (!context.has(this.name)) {
      throw new Error(\