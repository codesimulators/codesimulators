class BotHandler(SupportHandler):
    def _can_handle(self, t): return t.severity == 1
    def _resolve(self, t): print(f"Resolved by Bot: {t.issue}")

class AgentHandler(SupportHandler):
    def _can_handle(self, t): return t.severity == 2
    def _resolve(self, t): print(f"Resolved by Agent: {t.issue}")