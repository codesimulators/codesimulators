function nextGreaterElement(nums1, nums2) {
  const resultStorage = new Map(); // @viz: init_map
  const monoStack = []; // @viz: init_stack

  for (let num of nums2) { // @viz: loop
    while (monoStack.length > 0 && num > monoStack[monoStack.length - 1]) { // @viz: while_check
      const topVal = monoStack.pop(); // @viz: pop_stack
      resultStorage.set(topVal, num); // @viz: map_set
    }
    monoStack.push(num); // @viz: push
  }

  return nums1.map(n => resultStorage.get(n) ?? -1); // @viz: finish
}