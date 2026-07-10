type MyStack struct {
    q []int
}

func (this *MyStack) Push(x int) { // @viz: push_start
    this.q = append(this.q, x) // @viz: push_val
    for i := 0; i < len(this.q)-1; i++ { // @viz: loop @viz: push_end
        val := this.q[0] // @viz: rotate_pop
        this.q = this.q[1:]
        this.q = append(this.q, val) // @viz: rotate_push
    }
}

func (this *MyStack) Pop() int { // @viz: pop_start
    val := this.q[0] // @viz: pop_val
    this.q = this.q[1:]
    return val // @viz: pop_end
}

func (this *MyStack) Top() int { // @viz: top_start
    return this.q[0] // @viz: top_val @viz: top_end
}

func (this *MyStack) Empty() bool { // @viz: empty_start
    return len(this.q) == 0 // @viz: empty_check
}