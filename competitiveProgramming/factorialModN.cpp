#include <bits/stdc++.h>

#define REP(n, i) for(int i = 1; i <= n; i++)

using namespace std;

int main() {
	typedef long long ll;

	int x, n;
	ll retVal = 1;

	cin >> x >> n;	

	REP(x, i) {
		retVal = (retVal*i)%n;
	}

	cout << retVal%n << "\n";
}
