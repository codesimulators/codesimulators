class Stack:
    def __init__(self):
        self.items = []
    def push(self, element):
        self.items.append(element)
    def pop(self):
        return self.items.pop()