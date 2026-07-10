class DirectoryComposite : public FileSystemNode {
    std::string name;
    std::vector<FileSystemNode*> children;
public:
    DirectoryComposite(std::string n) : name(n) {}
    std::string getName() override { return name; }
    void add(FileSystemNode* node) { children.push_back(node); }
    int getSize() override {
        int sum = 0;
        for (auto child : children) {
            sum += child->getSize();
        }
        return sum;
    }
};