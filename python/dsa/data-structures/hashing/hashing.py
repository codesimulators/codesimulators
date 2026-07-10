def put(key, value):
    h = calculate_hash(key)
    idx = h % table_size
    if table[idx] is None:
        table[idx] = []
    table[idx].append((key, value))

if __name__ == "__main__":
    put("apple", 5)