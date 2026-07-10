var treeTypes = make(map[string]*TreeType)

func GetTreeType(name, color string) *TreeType {
    key := name + "_" + color
    if _, ok := treeTypes[key]; !ok {
        treeTypes[key] = &TreeType{Name: name, Color: color, TextureData: make([]byte, 1024*1024)}
    }
    return treeTypes[key]
}