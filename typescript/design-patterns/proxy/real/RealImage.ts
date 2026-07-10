// Expensive to create — decodes a big file.
class RealImage implements Image {
  constructor(private file: string) {
    console.log("loading " + file + " from disk…");  // heavy work
  }
  display() { return "🖼️ " + this.file; }
}