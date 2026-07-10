class ElementNode {
public:
    virtual ~ElementNode() = default;
    virtual void accept(Visitor* v) = 0;
};