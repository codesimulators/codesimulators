class NumberExpression(Expression):
    def __init__(self, value: float):
        self.value = value
    def interpret(self, context): return self.value

class VariableExpression(Expression):
    def __init__(self, name: str):
        self.name = name
    def interpret(self, context):
        return context[self.name]