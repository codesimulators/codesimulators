#include <unordered_map>

// The board layout — the ONLY thing that changes between a 10x10 board,
// a mini test board, or a completely different race game (see main.cpp).
struct SnakeLadderConfig {
    int finish;
    std::unordered_map<int,int> snakes;   // head -> tail
    std::unordered_map<int,int> ladders;  // bottom -> top

    static SnakeLadderConfig standard() {
        return SnakeLadderConfig{
            100,
            {{16,6},{46,25},{49,11},{62,19},{64,60},{74,53},{89,68},{92,88},{95,75},{99,80}},
            {{2,38},{7,14},{8,31},{15,26},{21,42},{28,84},{36,44},{51,67},{71,91},{78,98},{87,94}},
        };
    }
};