function counting_sort(arr) {
  let n = arr.length;
  let mx = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < n; i++) {
    if (arr[i] > mx) {
      mx = arr[i];
    }
  }

  let count = new Array(mx + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
  }

  for (let i = 1; i <= mx; i++) {
    count[i] += count[i - 1];
  }

  let output = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    output[--count[arr[i]]] = arr[i];
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

function print_arr(arr) {
  console.log(arr.join(" "));
}

let arr = [4, 3, 12, 1, 5, 5, 3, 9];
counting_sort(arr);
print_arr(arr);
