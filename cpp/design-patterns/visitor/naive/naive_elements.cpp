class Book {
    double price;
public:
    // ❌ Coupled calculations
    double getTax() { return price * 0.05; }
};