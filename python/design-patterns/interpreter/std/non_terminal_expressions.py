class AddExpression(Expression):
    def __init__(self, left: Expression, right: Expression):
        self.left = left
        self.right = right
    def interpret(self, context):
        return self.left.interpret(context) + self.right.interpret(context)