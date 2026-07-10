// Iterator interface: Standard traversal operations
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}