// The Flyweight: contains shared, immutable intrinsic state (textures, labels)
class TreeType {
  private textureData: number[];

  constructor(public name: string, public color: string) {
    this.textureData = new Array(1000000).fill(1); // 1MB allocated once
  }

  draw(x: number, y: number) {
    console.log(\