std::vector<std::string> renderLoginScreen(const std::string& os) {
    // ❌ one dev writes the button branch…
    auto button = os == "mac"
        ? std::unique_ptr<Button>(new MacButton())
        : std::unique_ptr<Button>(new WindowsButton());

    // ❌ …another writes the checkbox branch, defaulting to Mac:
    auto checkbox = os == "windows"
        ? std::unique_ptr<Checkbox>(new WindowsCheckbox())
        : std::unique_ptr<Checkbox>(new MacCheckbox());

    // 💥 On Windows: Windows button next to a Mac checkbox.
    return { button->render(), checkbox->render() };
}