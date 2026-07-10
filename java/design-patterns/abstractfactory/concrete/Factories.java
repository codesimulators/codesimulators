class MacFactory implements UIFactory {
    public Button createButton()     { return () -> "rounded button"; }
    public Checkbox createCheckbox() { return () -> "soft checkbox"; }
}
class WindowsFactory implements UIFactory {
    public Button createButton()     { return () -> "flat button"; }
    public Checkbox createCheckbox() { return () -> "square checkbox"; }
}