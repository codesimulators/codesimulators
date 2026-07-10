// The Flyweight Factory: caches and manages TreeType instances
class TreeFactory {
  private static treeTypes = new Map<string, TreeType>();

  static getTreeType(name: string, color: string): TreeType {
    const key = \