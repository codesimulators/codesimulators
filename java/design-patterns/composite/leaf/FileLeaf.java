class FileLeaf implements FileSystemNode {
    private String name;
    private int size;
    public FileLeaf(String name, int size) {
        this.name = name;
        this.size = size;
    }
    public String getName() { return name; }
    public int getSize() { return size; }
}