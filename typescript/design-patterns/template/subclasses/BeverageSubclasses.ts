class CoffeeMaker extends BeverageMaker {
  protected brew() {
    console.log("Dripping coffee grounds through filter...");
  }
  protected addCondiments() {
    console.log("Adding organic sugar and steamed milk...");
  }
}

class TeaMaker extends BeverageMaker {
  protected brew() {
    console.log("Steeping black tea leaves in water...");
  }
  protected addCondiments() {
    console.log("Adding freshly squeezed lemon...");
  }
}