class UsTaxVisitor : public Visitor {
public:
    double total = 0;
    void visitBook(Book* b) override { total += b->price * 0.05; }
};