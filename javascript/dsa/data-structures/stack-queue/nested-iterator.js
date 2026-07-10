class NestedIterator {
    constructor(nestedList) { // @viz: init
        this.stack = []; 
        for (let i = nestedList.length - 1; i >= 0; i--) { // @viz: init_loop
            this.stack.push(nestedList[i]); // @viz: init_push
        }
    }
 
    hasNext() { // @viz: has_next_start
        while (this.stack.length > 0) { // @viz: has_next_loop
            let top = this.stack[this.stack.length - 1]; // @viz: has_next_peek
            if (Number.isInteger(top)) // @viz: has_next_check
                return true; // @viz: has_next_return
            
            this.stack.pop(); // @viz: has_next_pop
            for (let i = top.length - 1; i >= 0; i--) { // @viz: flatten_loop
                this.stack.push(top[i]); // @viz: flatten_push
            }
        }
        return false; // @viz: has_next_fail
    }
 
    next() { // @viz: next_start
        return this.stack.pop(); // @viz: next_pop
    }
} // @viz: finish