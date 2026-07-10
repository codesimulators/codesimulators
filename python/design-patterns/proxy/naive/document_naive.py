class Document:
    def __init__(self, files):
        # ❌ every image decodes NOW, even ones never viewed
        self.images = [RealImage(f) for f in files]   # ~24MB decode EACH
    def show(self, i): return self.images[i].display()

doc = Document(["p1.raw", "p2.raw"])  # + 48 more
# All decoded up front — slow open, huge memory.