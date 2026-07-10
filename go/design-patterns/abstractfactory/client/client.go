// Screens depend on the factory interface — no platform checks:
func renderLoginScreen(ui UIFactory) []string {
    button := ui.CreateButton()
    checkbox := ui.CreateCheckbox()   // guaranteed SAME family
    return []string{button.Render(), checkbox.Render()}
}

// Choose the family ONCE, at startup:
var ui UIFactory = MacFactory{}   // or WindowsFactory{}, MaterialFactory{}
renderLoginScreen(ui)