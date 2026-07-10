class MedianFinder {
    priority_queue<int> maxH;
    priority_queue<int,vector<int>,greater<int>> minH;
public:
    void addNum(int num) {
        maxH.push(num);
        if (!minH.empty() && maxH.top() > minH.top()) {
            minH.push(maxH.top()); maxH.pop();
        }
        if (maxH.size() > minH.size() + 1) {
            minH.push(maxH.top()); maxH.pop();
        }
        else if (minH.size() > maxH.size()) {
            maxH.push(minH.top()); minH.pop();
            }
    }
    double findMedian() {
        if (maxH.size() > minH.size()) {
            return maxH.top();
        }
        return (maxH.top() + minH.top()) / 2.0;
    }
};