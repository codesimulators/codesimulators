class SupportSystem:
    def triage_ticket(self, category, severity):
        # ❌ Giant branching blocks
        if category == "password" or severity == 1:
            print("Handled by bot")
        elif category == "billing" or severity == 2:
            print("Handled by agent")
        elif severity == 3:
            print("Handled by supervisor")
        else:
            raise Exception("Unhandled")