class BeverageMaker {
public:
    // The Template Method
    void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }
private:
    void boilWater() { std::cout << "Boiling water\\n"; }
    void pourInCup() { std::cout << "Pouring in cup\\n"; }
protected:
    virtual void brew() = 0;
    virtual void addCondiments() = 0;
};