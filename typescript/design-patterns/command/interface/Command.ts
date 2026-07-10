// Command interface: standardizes execution and undo operations
interface Command {
  execute(): void;
  undo(): void;
}