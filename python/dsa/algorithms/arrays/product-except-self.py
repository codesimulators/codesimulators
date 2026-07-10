def productExceptSelf(nums):
    n = len(nums)
    # 1️⃣ Initialize result array
    res = [1] * n
    
    # 2️⃣ First pass: Calculate prefix products
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    
    # 3️⃣ Second pass: Calculate suffix products
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    
    return res