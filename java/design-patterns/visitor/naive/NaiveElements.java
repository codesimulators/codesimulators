class Book {
    int price;
    int weight;
    // ❌ Violates open-closed principles
    double getTax() { return price * 0.05; }
    double getShipping() { return weight * 2.0; }
}