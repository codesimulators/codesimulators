// Naive approach: every Tree instantiates its own heavy texture metadata
class NaiveTree {
  private name: string;
  private color: string;
  private textureData: number[]; // ❌ Heavy image binary data (e.g. 1MB)

  constructor(name: string, color: string, public x: number, public y: number) {
    this.name = name;
    this.color = color;
    this.textureData = new Array(1000000).fill(1); // simulated heavy load
  }
}

const forest: NaiveTree[] = [];
// Spawning 10,000 trees replicates 10,000 heavy arrays in memory, causing OOM!
for (let i = 0; i < 10000; i++) {
  forest.push(new NaiveTree("Oak", "Green", Math.random() * 100, Math.random() * 100));
}