class EquationEvaluator:
    def evaluate(self, expression: str, variables: dict) -> float:
        # ❌ dangerous python eval() calls
        parsed = expression
        for key, val in variables.items():
            parsed = parsed.replace(key, str(val))
        return eval(parsed) # ⚠️ Security vulnerability!