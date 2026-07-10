// Leaf: Represents basic files. Contains no children nodes.
class FileLeaf implements FileSystemNode {
  constructor(private name: string, private size: number) {}

  getName() { return this.name; }
  getSize() { return this.size; }
}