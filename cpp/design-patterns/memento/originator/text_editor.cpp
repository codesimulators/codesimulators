class TextEditor {
    std::string text;
public:
    void type(std::string val) { text += val; }
    Memento* save() { return new Memento(text); }
    void restore(Memento* m) { text = m->state; }
};