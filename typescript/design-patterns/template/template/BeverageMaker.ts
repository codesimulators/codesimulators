// Abstract Base: Defines the non-overridable template method
abstract class BeverageMaker {
  // 🎯 The Template Method: locks in the step sequence
  public final prepareRecipe(): void {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }

  private boilWater() {
    console.log("Boiling water to 95°C...");
  }

  private pourInCup() {
    console.log("Pouring beverage into standard cup...");
  }

  // Abstract hooks to be customized by subclasses
  protected abstract brew(): void;
  protected abstract addCondiments(): void;
}