class SupportSystem {
    void triageTicket(String category, int severity) {
        // ❌ Hardcoded, non-extensible triage rules
        if (category.equals("password") || severity == 1) {
            System.out.println("Resolved by bot");
        } else if (category.equals("billing") || severity == 2) {
            System.out.println("Resolved by tier-2 agent");
        } else {
            System.out.println("Escalated to supervisor");
        }
    }
}