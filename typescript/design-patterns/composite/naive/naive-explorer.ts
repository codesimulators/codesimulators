// Naive approach: client must distinguish between files and directories
class File {
  constructor(public name: string, public size: number) {}
}

class Directory {
  files: File[] = [];
  subdirs: Directory[] = [];
  constructor(public name: string) {}
}

function calculateTotalSize(dir: Directory): number {
  let total = 0;
  // ❌ Loop 1: sum file sizes
  for (const f of dir.files) {
    total += f.size;
  }
  // ❌ Loop 2: recurse through folders
  for (const d of dir.subdirs) {
    total += calculateTotalSize(d);
  }
  return total;
}
// Adding new types (e.g. SymbolLink or Shortcut) breaks this traversal logic!