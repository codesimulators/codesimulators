# Screens depend on the factory interface — no platform checks:
def render_login_screen(ui: UIFactory):
    button = ui.create_button()
    checkbox = ui.create_checkbox()   # guaranteed SAME family
    return [button.render(), checkbox.render()]

# Choose the family ONCE, at startup:
ui = {"mac": MacFactory, "windows": WindowsFactory}.get(os, MaterialFactory)()
render_login_screen(ui)

# New platform? Add one GtkFactory class. render_login_screen never changes.