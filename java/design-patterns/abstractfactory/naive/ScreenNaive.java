List<String> renderLoginScreen(String os) {
    // ❌ one dev writes the button branch…
    Button button = os.equals("mac") ? new MacButton() : new WindowsButton();

    // ❌ …another writes the checkbox branch, defaulting to Mac:
    Checkbox checkbox = os.equals("windows")
        ? new WindowsCheckbox() : new MacCheckbox();

    // 💥 On Windows: Windows button next to a Mac checkbox.
    return List.of(button.render(), checkbox.render());
}