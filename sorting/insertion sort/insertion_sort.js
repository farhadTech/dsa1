function insertionSort(arr) {
  let n = arr.length;
  for (let j = 1; j < n; j++) {
    let i = j - 1;
    let key = arr[j];

    while (i >= 0 && arr[i] > key) {
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = key;
  }
}

let arr = [9, 8, 2, 0, - 34, 1];
insertionSort(arr);

console.log(arr);

