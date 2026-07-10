class FileSystemNode {
public:
    virtual ~FileSystemNode() = default;
    virtual std::string getName() = 0;
    virtual int getSize() = 0;
};