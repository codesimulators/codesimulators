class TreeType {
    std::string name;
    std::string color;
    std::vector<char> textureData;
public:
    TreeType(std::string n, std::string c) : name(n), color(c) {
        textureData.resize(1024 * 1024);
    }
    void draw(int x, int y);
};