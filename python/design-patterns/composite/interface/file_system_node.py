from abc import ABC, abstractmethod

class FileSystemNode(ABC):
    @abstractmethod
    def get_name(self) -> str: pass
    @abstractmethod
    def get_size(self) -> int: pass