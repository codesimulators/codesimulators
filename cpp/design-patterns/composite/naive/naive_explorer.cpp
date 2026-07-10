class File {
public:
    std::string name;
    int size;
};
class Directory {
public:
    std::string name;
    std::vector<File> files;
    std::vector<Directory> subdirs;
};