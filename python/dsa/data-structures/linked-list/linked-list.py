# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def search(self, head: ListNode, target: int) -> bool:
        current = head
        while current:
            if current.val == target:
                return True
            current = current.next
        return False