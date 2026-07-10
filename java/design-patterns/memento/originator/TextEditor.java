public class TextEditor {
    private String text = "";
    public void type(String value) { this.text += value; }
    public String getText() { return text; }

    public Memento save() { return new Memento(text); }
    public void restore(Memento m) {
        this.text = m.getState();
    }
}