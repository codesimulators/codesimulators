class RealImage : public Image {
    std::string file;
public:
    explicit RealImage(std::string f) : file(std::move(f)) {
        std::cout << "loading " << file << "\\n"; // heavy
    }
    std::string display() override { return "img " + file; }
};