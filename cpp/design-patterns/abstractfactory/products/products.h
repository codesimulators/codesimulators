struct Button   { virtual std::string render() = 0; virtual ~Button() = default; };
struct Checkbox { virtual std::string render() = 0; virtual ~Checkbox() = default; };