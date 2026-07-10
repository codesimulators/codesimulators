type MinStack struct {
    data    []int
    minData []int
}

func Constructor() MinStack { // @viz:init_stack
    return MinStack{ // @viz:init_min
        data:    []int{},
        minData: []int{},
    }
}

func (this *MinStack) Push(val int) { // @viz:push_start
    this.data = append(this.data, val) // @viz:push_val
    if len(this.minData) == 0 || val <= this.minData[len(this.minData)-1] { // @viz:min_check
        this.minData = append(this.minData, val) // @viz:min_push
    }
} // @viz:push_end

func (this *MinStack) Pop() { // @viz:pop_start
    popped := this.data[len(this.data)-1] // @viz:pop_val
    this.data = this.data[:len(this.data)-1]
    if popped == this.minData[len(this.minData)-1] { // @viz:pop_min_check
        this.minData = this.minData[:len(this.minData)-1] // @viz:min_pop
    }
} // @viz:pop_end

func (this *MinStack) Top() int { // @viz:top_start
    return this.data[len(this.data)-1] // @viz:top_val
}

func (this *MinStack) GetMin() int { // @viz:get_min_start
    return this.minData[len(this.minData)-1] // @viz:min_val
}