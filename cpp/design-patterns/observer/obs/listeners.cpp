class MobileApp : public Observer {
public:
    void update(double price) override {
        std::cout << "push: " << price << "\\n";
    }
};