class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) { // @viz: push_start
    this.inStack.push(x); // @viz: push_val @viz: push_end
  }

  pop() { // @viz: pop_start
    this.peek(); // @viz: pop_peek
    return this.outStack.pop(); // @viz: pop_val @viz: pop_end
  }

  peek() { // @viz: peek_start
    if (this.outStack.length === 0) { // @viz: peek_check
      while (this.inStack.length > 0) { // @viz: move_loop
        const val = this.inStack.pop(); // @viz: move_pop
        this.outStack.push(val); // @viz: move_push
      }
    }
    return this.outStack[this.outStack.length - 1]; // @viz: peek_val @viz: peek_end
  }

  empty() { // @viz: empty_start
    return this.inStack.length === 0 && this.outStack.length === 0; // @viz: empty_check
  }
}