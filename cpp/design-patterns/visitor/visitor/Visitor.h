class Book; class Electronics;
class Visitor {
public:
    virtual ~Visitor() = default;
    virtual void visitBook(Book* b) = 0;
    virtual void visitElectronics(Electronics* e) = 0;
};