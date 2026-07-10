/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool search(ListNode* head, int target) {
        ListNode* current = head;
        while (current != nullptr) {
            if (current->val == target) {
                return true;
            }
            current = current->next;
        }
        return false;
    }
};