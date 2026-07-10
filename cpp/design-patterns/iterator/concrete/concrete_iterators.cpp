class ProductIterator : public Iterator<std::string> {
    std::vector<std::string> list;
    int index = 0;
public:
    bool hasNext() override { return index < list.size(); }
};