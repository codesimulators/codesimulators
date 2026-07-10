class Tv(Device):
    def __init__(self):
        self._on = False
        self._volume = 30
    def is_enabled(self): return self._on
    def enable(self): self._on = True
    def disable(self): self._on = False
    def get_volume(self): return self._volume
    def set_volume(self, p): self._volume = max(0, min(100, p))

class Radio(Device):
    def __init__(self):
        self._on = False
        self._volume = 15
    def is_enabled(self): return self._on
    def enable(self): self._on = True
    def disable(self): self._on = False
    def get_volume(self): return self._volume
    def set_volume(self, p): self._volume = max(0, min(100, p))