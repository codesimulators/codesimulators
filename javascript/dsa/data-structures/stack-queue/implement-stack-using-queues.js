class MyStack {
  constructor() {
    this.mainQueue = [];
  }

  push(x) { // @viz: push_start
    this.mainQueue.push(x); // @viz: push_val
    for (let i = 0; i < this.mainQueue.length - 1; i++) { // @viz: loop @viz: push_end
      const rotated = this.mainQueue.shift(); // @viz: rotate_pop
      this.mainQueue.push(rotated); // @viz: rotate_push
    }
  }

  pop() { // @viz: pop_start
    return this.mainQueue.shift(); // @viz: pop_val @viz: pop_end
  }

  top() { // @viz: top_start
    return this.mainQueue[0]; // @viz: top_val @viz: top_end
  }

  empty() { // @viz: empty_start
    return this.mainQueue.length === 0; // @viz: empty_check
  }
}