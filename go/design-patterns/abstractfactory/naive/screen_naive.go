func renderLoginScreen(os string) []string {
    // ❌ one dev writes the button branch…
    var button Button
    if os == "mac" { button = MacButton{} } else { button = WindowsButton{} }

    // ❌ …another writes the checkbox branch, defaulting to Mac:
    var checkbox Checkbox
    if os == "windows" { checkbox = WindowsCheckbox{} } else { checkbox = MacCheckbox{} }

    // 💥 On Windows: Windows button next to a Mac checkbox.
    return []string{button.Render(), checkbox.Render()}
}