type MyQueue struct {
    inStack  []int
    outStack []int
}

func (this *MyQueue) Push(x int) { // @viz: push_start
    this.inStack = append(this.inStack, x) // @viz: push_val @viz: push_end
}

func (this *MyQueue) Pop() int { // @viz: pop_start
    val := this.Peek() // @viz: pop_peek
    this.outStack = this.outStack[:len(this.outStack)-1] // @viz: pop_val @viz: pop_end
    return val
}

func (this *MyQueue) Peek() int { // @viz: peek_start
    if len(this.outStack) == 0 { // @viz: peek_check
        for len(this.inStack) > 0 { // @viz: move_loop
            val := this.inStack[len(this.inStack)-1] // @viz: move_pop
            this.inStack = this.inStack[:len(this.inStack)-1]
            this.outStack = append(this.outStack, val) // @viz: move_push
        }
    }
    return this.outStack[len(this.outStack)-1] // @viz: peek_val @viz: peek_end
}

func (this *MyQueue) Empty() bool { // @viz: empty_start
    return len(this.inStack) == 0 && len(this.outStack) == 0 // @viz: empty_check
}