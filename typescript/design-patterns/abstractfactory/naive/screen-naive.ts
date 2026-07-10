function renderLoginScreen(os: string) {
  // ❌ one dev writes the button branch…
  const button = os === "mac" ? new MacButton() : new WindowsButton();

  // ❌ …another dev writes the checkbox branch, defaulting to Mac:
  const checkbox = os === "windows" ? new WindowsCheckbox() : new MacCheckbox();

  // 💥 On Windows this screen now shows a Windows button
  //    next to a Mac checkbox. Nothing caught the mismatch.
  return [button.render(), checkbox.render()];
}
// Every screen repeats the same "if mac else windows" branch,
// and nothing guarantees the widgets belong to the same family.