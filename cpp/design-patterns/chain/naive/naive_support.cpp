class SupportSystem {
public:
    // ❌ Tight coupling to every single resolution route
    void triageTicket(std::string category, int severity) {
        if (category == "password") std::cout << "Bot handled\\n";
        else std::cout << "Escalate\\n";
    }
};