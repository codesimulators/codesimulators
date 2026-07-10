/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func search(head *ListNode, target int) bool {
    current := head
    for current != nil {
        if current.Val == target {
            return true
        }
        current = current.Next
    }
    return false
}