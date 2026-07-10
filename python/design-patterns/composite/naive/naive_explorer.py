class File:
    def __init__(self, name, size):
        self.name = name
        self.size = size

class Directory:
    def __init__(self, name):
        self.name = name
        self.files = []
        self.subdirs = []

def get_total_size(directory):
    total = 0
    # ❌ loops over files
    for f in directory.files:
        total += f.size
    # ❌ loops over directories separately
    for d in directory.subdirs:
        total += get_total_size(d)
    return total