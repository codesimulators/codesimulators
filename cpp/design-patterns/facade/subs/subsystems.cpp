class Amplifier    { public: void on(); void setVolume(int v); };
class Lights       { public: void dim(int pct); };
class Projector    { public: void on(); void wide(); };
class StreamingBox { public: void play(std::string title); };