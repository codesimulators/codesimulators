class TreeFactory {
    static std::unordered_map<std::string, TreeType*> types;
public:
    static TreeType* getTreeType(const std::string& name, const std::string& color) {
        std::string key = name + "_" + color;
        if (types.find(key) == types.end()) {
            types[key] = new TreeType(name, color);
        }
        return types[key];
    }
};