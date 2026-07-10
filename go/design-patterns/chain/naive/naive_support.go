func Triage(category string, severity int) {
    // ❌ Monolithic switch structures
    switch {
    case category == "password":
        fmt.Println("Handled by bot")
    case severity == 2:
        fmt.Println("Handled by agent")
    }
}