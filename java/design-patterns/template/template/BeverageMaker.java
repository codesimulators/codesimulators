public abstract class BeverageMaker {
    // The Template Method: final keyword prevents subclasses from overriding
    public final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }
    private void boilWater() { System.out.println("Boiling water..."); }
    private void pourInCup() { System.out.println("Pouring in cup..."); }

    protected abstract void brew();
    protected abstract void addCondiments();
}