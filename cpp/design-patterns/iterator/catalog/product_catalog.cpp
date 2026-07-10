class ProductCatalog {
    std::vector<std::string> products;
public:
    Iterator<std::string>* createIterator() {
        return new ProductIterator(products);
    }
};