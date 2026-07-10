class TreeFactory:
    _types = {}

    @classmethod
    def get_tree_type(cls, name: str, color: str) -> TreeType:
        key = f"{name}_{color}"
        if key not in cls._types:
            cls._types[key] = TreeType(name, color)
        return cls._types[key]