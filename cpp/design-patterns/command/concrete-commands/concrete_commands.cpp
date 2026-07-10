class LightOnCommand : public Command {
    Light* light;
public:
    LightOnCommand(Light* l) : light(l) {}
    void execute() override { light->turnOn(); }
    void undo() override { light->turnOff(); }
};