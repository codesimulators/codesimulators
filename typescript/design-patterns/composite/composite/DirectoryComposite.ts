// Composite: Represents directories. Contains subfolders or files.
class DirectoryComposite implements FileSystemNode {
  private children: FileSystemNode[] = [];

  constructor(private name: string) {}

  getName() { return this.name; }

  add(node: FileSystemNode) {
    this.children.push(node);
  }

  getSize(): number {
    // 🎯 Recursively sum sizes of all children uniformly
    return this.children.reduce((acc, curr) => acc + curr.getSize(), 0);
  }
}