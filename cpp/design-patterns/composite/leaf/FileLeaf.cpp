class FileLeaf : public FileSystemNode {
    std::string name;
    int size;
public:
    FileLeaf(std::string n, int s) : name(n), size(s) {}
    std::string getName() override { return name; }
    int getSize() override { return size; }
};