/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} target
 * @return {boolean}
 */
var search = function(head, target) {
    let current = head;
    while (current !== null) {
        if (current.val === target) {
            return true;
        }
        current = current.next;
    }
    return false;
};