// Screens depend on the factory interface — no platform checks:
std::vector<std::string> renderLoginScreen(UIFactory& ui) {
    auto button = ui.createButton();
    auto checkbox = ui.createCheckbox();   // guaranteed SAME family
    return { button->render(), checkbox->render() };
}

// Choose the family ONCE, at startup:
std::unique_ptr<UIFactory> ui = std::make_unique<MacFactory>();
renderLoginScreen(*ui);