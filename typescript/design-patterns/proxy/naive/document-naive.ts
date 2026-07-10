class Document {
  private images: RealImage[];
  constructor(files: string[]) {
    // ❌ every image decodes NOW, even ones the user never scrolls to
    this.images = files.map(f => new RealImage(f));  // ~24MB decode EACH
  }
  show(i: number) { return this.images[i].display(); }
}

const doc = new Document(["p1.raw", "p2.raw", /* …48 more… */]);
// 50 decodes, ~1.2GB of RAM, several seconds of work —
// all before a single pixel is on screen.