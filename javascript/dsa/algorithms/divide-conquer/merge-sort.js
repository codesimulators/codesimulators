function mergeSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  const m = Math.floor(l + (r - l) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}

function merge(arr, l, m, r) {
  const L = arr.slice(l, m + 1);
  const R = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;

  while (i < L.length && j < R.length) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < L.length) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < R.length) {
    arr[k] = R[j];
    j++;
    k++;
  }
}