class ImageProxy : public Image {
    std::string file;
    std::unique_ptr<RealImage> real;
public:
    explicit ImageProxy(std::string f) : file(std::move(f)) {}
    std::string display() override {
        if (!real) real = std::make_unique<RealImage>(file);
        return real->display();
    }
};