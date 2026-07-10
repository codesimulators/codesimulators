// Same interface, defers the expensive part.
class ImageProxy implements Image {
  private real?: RealImage;
  constructor(private file: string) {}   // cheap

  display() {
    if (!this.real) {
      this.real = new RealImage(this.file);   // load ONCE, on first use
    }
    return this.real.display();              // then cache
  }
}