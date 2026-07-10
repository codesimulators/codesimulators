// Memento: Immutable token representing a state snapshot. Exposes no methods.
class Memento {
  // State is read-only and accessible only to the originator class
  constructor(private readonly state: string) {}

  getState(): string {
    return this.state;
  }
}