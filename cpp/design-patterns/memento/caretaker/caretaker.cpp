class HistoryManager {
    std::vector<Memento*> list;
public:
    void push(Memento* m) { list.push_back(m); }
};