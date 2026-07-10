// Naive approach: one master controller contains all triage rules
class SupportSystem {
  triageTicket(category: string, severity: number) {
    // ❌ Hardcoded rules are highly fragile and break open-closed principles
    if (category === "password" || severity === 1) {
      console.log("Resolved automatically by ChatBot");
    } else if (category === "billing" || severity === 2) {
      console.log("Routed to Tier-2 Agent desk");
    } else if (severity === 3) {
      console.log("Escalated to Director of Support");
    } else {
      throw new Error("Unable to triage ticket");
    }
  }
}
// Adding a specialized "Security Audit" handler means rewriting this massive conditional block.