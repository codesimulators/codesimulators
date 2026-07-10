// Screens depend on the factory interface — no platform checks, no concrete classes:
function renderLoginScreen(ui: UIFactory) {
  const button = ui.createButton();
  const checkbox = ui.createCheckbox();   // guaranteed SAME family as the button
  return [button.render(), checkbox.render()];
}

// Choose the family ONCE, at startup:
const ui: UIFactory =
  os === "mac"       ? new MacFactory()
  : os === "windows" ? new WindowsFactory()
  :                    new MaterialFactory();

renderLoginScreen(ui);   // every widget matches, automatically

// New platform? Add one GtkFactory class. renderLoginScreen never changes.