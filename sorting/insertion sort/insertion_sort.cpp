#include <iostream>
#include <vector>
using namespace std;

void insertion_sort(vector<int>& a) {
  int n = a.size();
  for (int j = 1; j < n; j++){
    int i = j - 1;
    int key = a[j];

    while(i >= 0 and a[i] > key) {
      a[i + 1] = a[i];
      i--;
    }
    a[i + 1] = key;
  }
}

void print_array(vector<int>&a) {
  for (int i = 0; i < a.size(); i++) {
    cout << a[i] << " ";
  }
  cout << '\n';
}

int main() {
  vector<int> a;
  a = {23, 10, 5, 2, 0, 7, 3};
  insertion_sort(a);
  print_array(a);
  return 0;
}

