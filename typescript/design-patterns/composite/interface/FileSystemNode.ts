// Component: The shared interface for both individual files and group containers
interface FileSystemNode {
  getName(): string;
  getSize(): number;
}