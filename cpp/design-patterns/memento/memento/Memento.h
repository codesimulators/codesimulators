class Memento {
    std::string state;
    friend class TextEditor; // Originator has friend access
    Memento(std::string s) : state(s) {}
    std::string getState() { return state; }
};