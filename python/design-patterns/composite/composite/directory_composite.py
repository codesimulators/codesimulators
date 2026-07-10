class DirectoryComposite(FileSystemNode):
    def __init__(self, name: str):
        self.name = name
        self.children = []
    def get_name(self): return self.name
    def add(self, node): self.children.append(node)
    def get_size(self):
        return sum(child.get_size() for child in self.children)