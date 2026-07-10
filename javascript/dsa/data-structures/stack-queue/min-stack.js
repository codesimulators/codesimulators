class MinStack {
  constructor() { // @viz:init_stack
    this.values = [];
    this.minimums = []; // @viz:init_min
  }

  push(val) { // @viz:push_start
    this.values.push(val); // @viz:push_val
    if (this.minimums.length === 0 || val <= this.minimums[this.minimums.length - 1]) { // @viz:min_check
      this.minimums.push(val); // @viz:min_push
    }
  } // @viz:push_end

  pop() { // @viz:pop_start
    const popped = this.values.pop(); // @viz:pop_val
    if (popped === this.minimums[this.minimums.length - 1]) { // @viz:pop_min_check
      this.minimums.pop(); // @viz:min_pop
    }
  } // @viz:pop_end

  top() { // @viz:top_start
    return this.values[this.values.length - 1]; // @viz:top_val
  }

  getMin() { // @viz:get_min_start
    return this.minimums[this.minimums.length - 1]; // @viz:min_val
  }
}