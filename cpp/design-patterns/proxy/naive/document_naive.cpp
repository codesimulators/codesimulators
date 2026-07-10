class Document {
    std::vector<RealImage> images;
public:
    explicit Document(const std::vector<std::string>& files) {
        // ❌ every image decodes NOW, even ones never viewed
        for (auto& f : files) images.emplace_back(f); // ~24MB EACH
    }
    std::string show(int i) { return images[i].display(); }
};
// Document(fiftyFiles) -> 50 decodes before anything is shown.