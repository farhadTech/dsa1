public class counting_sort {
  public static void countingSort(int[] arr) {
    int n = arr.length;
    int mx = Integer.MIN_VALUE;
    for (int it : arr) {
      if (it > mx)
        mx = it;
    }
    int[] count = new int[mx + 1];
    for (int it : arr) {
      count[it]++;
    }
    for (int i = 1; i <= mx; i++) {
      count[i] += count[i - 1];
    }
    int[] output = new int[n];
    for (int i = n - 1; i >= 0; i--) {
      output[--count[arr[i]]] = arr[i];
    }
    for (int i = 0; i < n; i++) {
      arr[i] = output[i];
    }
  }

  public static void print_arr(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      System.out.printf("%d ", arr[i]);
    }
    System.out.println();
  }

  public static void main(String[] args) {
    int[] arr = { 4, 3, 12, 1, 5, 5, 3, 9 };
    countingSort(arr);
    print_arr(arr);
  }
}
