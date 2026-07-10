class Queue:
    def __init__(self):
        self.items = []
    def enqueue(self, val):
        self.items.append(val)
    def dequeue(self):
        return self.items.pop(0)