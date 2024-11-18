#include <iostream>
using namespace std;

// Function to swap two elements
void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

// Partition function that uses the first element as the pivot
int partition(int arr[], int low, int high) {
    int pivot = arr[low];  // pivot is the first element
    int i = low;  // i is the boundary for smaller elements

    // Traverse through the array and compare each element with the pivot
    for (int j = low + 1; j <= high; j++) {
        if (arr[j] <= pivot) {  // If element is smaller than or equal to pivot
            i++;  // increment the smaller element boundary
            swap(arr[i], arr[j]);  // Swap the element with the element at i
        }
    }
    // Finally, swap the pivot with the element at i to place pivot in the correct position
    swap(arr[low], arr[i]);
    return i;  // Return the pivot index
}

// Quick Sort function
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // Partition the array and get the pivot index
        int pi = partition(arr, low, high);

        // Recursively sort the subarrays
        quickSort(arr, low, pi - 1);  // Left subarray
        quickSort(arr, pi + 1, high); // Right subarray
    }
}

// Function to print the array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {9, 7, 5, 11, 12, 2, 14, 3, 10, 6};  // Array to be sorted
    int n = sizeof(arr) / sizeof(arr[0]);  // Size of the array

    cout << "Original Array: ";
    printArray(arr, n);

    // Perform Quick Sort
    quickSort(arr, 0, n - 1);

    cout << "Sorted Array: ";
    printArray(arr, n);

    return 0;
}
