class ProductCatalog {
    private List<String> products = new ArrayList<>();
    public Iterator<String> createIterator() {
        return new ProductIterator(products);
    }
}