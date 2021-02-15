#include <bits/stdc++.h>

using namespace std;

int main() {
	vector<int> v;
	int x;
	while(cin >> x) {
		v.push_back(x);
	}
	sort(v.begin(), v.end());
	cout << "\n";
	for(int i=0;i<(int)v.size();i++){
		cout << v[i] << " ";
	}
	cout << "\n";
}
