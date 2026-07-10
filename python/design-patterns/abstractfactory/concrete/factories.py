class MacFactory(UIFactory):
    def create_button(self):   return MacButton()
    def create_checkbox(self): return MacCheckbox()

class WindowsFactory(UIFactory):
    def create_button(self):   return WinButton()
    def create_checkbox(self): return WinCheckbox()