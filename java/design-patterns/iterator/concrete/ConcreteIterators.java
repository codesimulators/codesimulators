class ProductIterator implements Iterator<String> {
    private List<String> list;
    private int index = 0;
    public ProductIterator(List<String> list) { this.list = list; }
    public boolean hasNext() { return index < list.size(); }
    public String next() { return list.get(index++); }
}