class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(val) {
    this.items.push(val);
  }
  dequeue() {
    return this.items.shift();
  }
}