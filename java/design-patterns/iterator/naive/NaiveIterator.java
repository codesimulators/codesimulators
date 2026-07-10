class ProductCatalog {
    public List<String> products = new ArrayList<>();
}
// Client loops must change if catalog format shifts
for (int i = 0; i < catalog.products.size(); i++) {
    System.out.println(catalog.products.get(i));
}