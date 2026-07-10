// Screens depend on the factory interface — no platform checks:
List<String> renderLoginScreen(UIFactory ui) {
    Button button = ui.createButton();
    Checkbox checkbox = ui.createCheckbox();   // guaranteed SAME family
    return List.of(button.render(), checkbox.render());
}

// Choose the family ONCE, at startup:
UIFactory ui = switch (os) {
    case "mac"     -> new MacFactory();
    case "windows" -> new WindowsFactory();
    default        -> new MaterialFactory();
};
renderLoginScreen(ui);   // every widget matches, automatically