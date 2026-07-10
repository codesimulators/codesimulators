class CoffeeMaker : public BeverageMaker {
protected:
    void brew() override { std::cout << "Brewing coffee\\n"; }
    void addCondiments() override { std::cout << "Adding sugar\\n"; }
};