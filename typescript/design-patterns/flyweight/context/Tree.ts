// The Context: holds only the mutable, extrinsic state (coordinates)
class Tree {
  constructor(
    public x: number,
    public y: number,
    private type: TreeType // reference to shared flyweight type
  ) {}

  draw() {
    this.type.draw(this.x, this.y);
  }
}