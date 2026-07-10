class TextEditor {
    public String text = "";
    public int cursor;
}
class HistoryManager {
    // ❌ History manager violates editor encapsulation
    private List<Object[]> history = new ArrayList<>();
    public void save(TextEditor e) {
        history.add(new Object[]{ e.text, e.cursor });
    }
}