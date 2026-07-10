// One concrete factory per platform — products always match.
class MacFactory implements UIFactory {
  createButton()   { return { render: () => "🍎 rounded button" }; }
  createCheckbox() { return { render: () => "🍎 soft checkbox" }; }
}
class WindowsFactory implements UIFactory {
  createButton()   { return { render: () => "🪟 flat button" }; }
  createCheckbox() { return { render: () => "🪟 square checkbox" }; }
}