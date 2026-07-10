def render_login_screen(os):
    # ❌ one dev writes the button branch…
    button = MacButton() if os == "mac" else WindowsButton()

    # ❌ …another writes the checkbox branch, defaulting to Mac:
    checkbox = WindowsCheckbox() if os == "windows" else MacCheckbox()

    # 💥 On Windows: Windows button next to a Mac checkbox.
    return [button.render(), checkbox.render()]