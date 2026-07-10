class RemoteControl:
    def __init__(self):
        self.history = []
    def execute_command(self, command):
        command.execute()
        self.history.append(command)
    def press_undo(self):
        if self.history:
            cmd = self.history.pop()
            cmd.undo()