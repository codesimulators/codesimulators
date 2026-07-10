def is_palindrome(s: str) -> bool:
    # 🟠 INITIALIZE: Start pointers at boundaries
    left, right = 0, len(s) - 1

    # 🟢 LOOP & PROCESS: Converge until mismatch or meet
    while left < right:
        # 1️⃣ Process: Evaluate if characters match
        is_left_alpha = s[left].isalnum()
        is_right_alpha = s[right].isalnum()

        if is_left_alpha and is_right_alpha:
            if s[left].lower() != s[right].lower():
                return False

        # 2️⃣ Decide and Act: Skip non-alphanumeric or move both
        if not is_left_alpha:
            left += 1
        elif not is_right_alpha:
            right -= 1
        else:
            left += 1
            right -= 1

    return True