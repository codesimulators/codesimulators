type NestedIterator struct {
    stack []interface{}
}

func Constructor(nestedList []interface{}) *NestedIterator { // @viz: init
    stack := []interface{}{}
    for i := len(nestedList) - 1; i >= 0; i-- { // @viz: init_loop
        stack = append(stack, nestedList[i]) // @viz: init_push
    }
    return &NestedIterator{stack: stack}
}
 
func (this *NestedIterator) Next() int { // @viz: next_start
    val := this.stack[len(this.stack)-1].(int) // @viz: next_pop
    this.stack = this.stack[:len(this.stack)-1]
    return val
}
 
func (this *NestedIterator) HasNext() bool { // @viz: has_next_start
    for len(this.stack) > 0 { // @viz: has_next_loop
        top := this.stack[len(this.stack)-1] // @viz: has_next_peek
        if val, ok := top.(int); ok { // @viz: has_next_check
            _ = val
            return true // @viz: has_next_return
        }
        this.stack = this.stack[:len(this.stack)-1] // @viz: has_next_pop
        list := top.([]interface{})
        for i := len(list) - 1; i >= 0; i-- { // @viz: flatten_loop
            this.stack = append(this.stack, list[i]) // @viz: flatten_push
        }
    }
    return false // @viz: has_next_fail
} // @viz: finish