class CoffeeMaker {
    void prepareRecipe() {
        System.out.println("Boiling water"); // ❌ duplicated
        System.out.println("Dripping coffee");
        System.out.println("Pouring in cup"); // ❌ duplicated
        System.out.println("Adding milk");
    }
}
class TeaMaker {
    void prepareRecipe() {
        System.out.println("Boiling water"); // ❌ duplicated
        System.out.println("Steeping tea");
        System.out.println("Pouring in cup"); // ❌ duplicated
        System.out.println("Adding lemon");
    }
}