class Tree {
    int x, y;
    TreeType* type;
public:
    Tree(int x_val, int y_val, TreeType* t) : x(x_val), y(y_val), type(t) {}
    void draw() { type->draw(x, y); }
};