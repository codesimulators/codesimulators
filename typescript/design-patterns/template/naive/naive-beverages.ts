// Naive approach: separate classes replicate identical boiling/pouring steps
class CoffeeMaker {
  prepare() {
    console.log("Boiling water..."); // ❌ duplicated boilerplate
    console.log("Dripping coffee through filter...");
    console.log("Pouring into cup...");    // ❌ duplicated boilerplate
    console.log("Adding milk and sugar...");
  }
}

class TeaMaker {
  prepare() {
    console.log("Boiling water..."); // ❌ duplicated boilerplate
    console.log("Steeping the tea...");
    console.log("Pouring into cup...");    // ❌ duplicated boilerplate
    console.log("Adding lemon...");
  }
}
// Changing the boiling temperature means editing every single preparation class!