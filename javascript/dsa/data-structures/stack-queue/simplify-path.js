function simplifyPath(path) {
  const stack = []; // @viz: init
  const components = path.split("/"); // @viz: split

  for (const part of components) { // @viz: loop
    if (part === "." || part === "") { // @viz: check_skip
      continue; // @viz: skip
    }
    
    if (part === "..") { // @viz: check_parent
      if (stack.length > 0) { // @viz: check_pop
        stack.pop(); // @viz: pop
      }
    } else {
      stack.push(part); // @viz: push
    }
  }

  const finalPath = "/" + stack.join("/"); // @viz: finish
  return finalPath;
}