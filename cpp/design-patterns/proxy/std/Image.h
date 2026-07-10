class Image {
public:
    virtual ~Image() = default;
    virtual std::string display() = 0;
};