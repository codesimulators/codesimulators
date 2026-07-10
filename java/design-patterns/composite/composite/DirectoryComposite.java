class DirectoryComposite implements FileSystemNode {
    private String name;
    private List<FileSystemNode> children = new ArrayList<>();
    public DirectoryComposite(String name) { this.name = name; }
    public String getName() { return name; }
    public void add(FileSystemNode node) { children.add(node); }
    public int getSize() {
        int sum = 0;
        for (FileSystemNode node : children) {
            sum += node.getSize();
        }
        return sum;
    }
}