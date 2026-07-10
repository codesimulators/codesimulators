class UsTaxVisitor implements Visitor {
    double total = 0;
    public void visitBook(Book b) { total += b.price * 0.05; }
    public void visitElectronics(Electronics e) { total += e.price * 0.15; }
}