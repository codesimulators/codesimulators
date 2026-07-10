class ImageProxy(Image):
    def __init__(self, file):
        self.file = file
        self._real = None
    def display(self):
        if self._real is None:
            self._real = RealImage(self.file)  # lazy
        return self._real.display()