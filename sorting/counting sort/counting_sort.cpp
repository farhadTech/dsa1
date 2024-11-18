#include <iostream>
#include <vector>
#include <climits>
using namespace std;

void counting_sort(vector<int>& a) {
  int n = a.size();
  int mx = INT_MIN;
  // Find the maximum element in the array
  for(int it : a) {
    if(it > mx)
      mx = it;
  }

  // Create a count array to store the frequency of each element
  vector<int> count(mx + 1, 0);

  // Count the frequency of each element
  for(int it: a) {
    count[it]++;
  }

  // Update the count array to hold the cumulative sum of counts
  for (int i = 1; i <= mx; i++) {
    count[i] += count[i - 1];
  }

  // Create an output array to store the sorted elements
  vector<int> output(n);

  // Build the output array using the count array
  for (int i = n - 1; i >= 0; i--) {
    output[--count[a[i]]] = a[i];
  }

  // Copy the sorted elements back into the original array
  for (int i = 0; i < n; i++) {
    a[i] = output[i];
  }
}

void print_array(const vector<int>& a) {
  for(int p: a) {
    cout << p << " ";
  }
  cout << '\n';
}

int main() {
  vector<int> a = {2, 5, 3, 0, 2, 3, 0, 3};
  counting_sort(a);
  print_array(a);
  return 0;
}
