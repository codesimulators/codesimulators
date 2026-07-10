// AddExpression (Non-Terminal): interprets left and right sub-expressions recursively
class AddExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  interpret(context: Map<string, number>): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

// SubtractExpression (Non-Terminal): handles operations
class SubtractExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  interpret(context: Map<string, number>): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }
}