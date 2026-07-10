function computePrefixSum(arr) {
    const prefix = new Array(arr.length);
    if (arr.length === 0) {
        return prefix;
    }

    prefix[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    return prefix;
}