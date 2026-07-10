class Aircraft {
    std::string id;
    std::vector<Aircraft*> peers; // ❌
};