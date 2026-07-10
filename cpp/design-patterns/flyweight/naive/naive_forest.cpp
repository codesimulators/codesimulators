class NaiveTree {
    std::string name;
    std::string color;
    std::vector<char> textureData; // ❌ Heavy payload
    int x, y;
public:
    NaiveTree(std::string n, std::string c, int x_val, int y_val)
        : name(n), color(c), x(x_val), y(y_val) {
        textureData.resize(1024 * 1024);
    }
};