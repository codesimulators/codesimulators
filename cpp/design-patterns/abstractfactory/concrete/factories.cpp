struct MacFactory : UIFactory {
    std::unique_ptr<Button> createButton() override;
    std::unique_ptr<Checkbox> createCheckbox() override;
};