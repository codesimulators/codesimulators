func simplifyPath(pathString string) string {
    stack := []string{} // @viz: init
    parts := strings.Split(pathString, "/") // @viz: split
    
    for _, part := range parts { // @viz: loop
        if part == "." || part == "" { // @viz: check_skip
            continue // @viz: skip
        }
        
        if part == ".." { // @viz: check_parent
            if len(stack) > 0 { // @viz: check_pop
                stack = stack[:len(stack)-1] // @viz: pop
            }
        } else {
            stack = append(stack, part) // @viz: push
        }
    }
    
    return "/" + strings.Join(stack, "/") // @viz: finish
}