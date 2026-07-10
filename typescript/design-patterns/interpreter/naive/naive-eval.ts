// Naive approach: using eval() or fragile string parsers
class EquationEvaluator {
  evaluate(expression: string, variables: Record<string, number>): number {
    // ❌ Using eval() is a massive security hazard and lacks structural compiler safety
    let parsed = expression;
    for (const [key, value] of Object.entries(variables)) {
      parsed = parsed.replaceAll(key, value.toString());
    }
    return eval(parsed); // ⚠️ Security risk: injection attacks!
  }
}