class RealImage(Image):
    def __init__(self, file):
        print("loading", file)      # heavy
        self.file = file
    def display(self): return "img " + self.file