class CoffeeMaker extends BeverageMaker {
    protected void brew() { System.out.println("Dripping coffee..."); }
    protected void addCondiments() { System.out.println("Adding sugar..."); }
}
class TeaMaker extends BeverageMaker {
    protected void brew() { System.out.println("Steeping tea..."); }
    protected void addCondiments() { System.out.println("Adding lemon..."); }
}