// Each state is an object that knows how to react to events.
interface PlayerState {
  play(p: Player): void;
  pause(p: Player): void;
  stop(p: Player): void;
  name: string;
}