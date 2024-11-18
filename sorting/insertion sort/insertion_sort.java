public class insertion_sort {
  public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int j = 1; j < n; j++) {
      int i = j - 1;
      int key = arr[j];

      while (i >= 0 && arr[i] > key) {
        arr[i + 1] = arr[i];
        i--;
      }
      arr[i + 1] = key;
    }
  }

  public static void print_array(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
      System.out.printf("%d ", arr[i]);
    }
    System.out.println();
  }

  public static void main(String[] args) {
    int arr[] = { 9, 8, 2, 0, -34, 1 };
    insertionSort(arr);
    print_array(arr);
  }
}
