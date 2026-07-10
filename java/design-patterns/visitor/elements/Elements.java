public interface ElementNode {
    void accept(Visitor v);
}
class Book implements ElementNode {
    int price;
    int weight;
    public void accept(Visitor v) { v.visitBook(this); }
}