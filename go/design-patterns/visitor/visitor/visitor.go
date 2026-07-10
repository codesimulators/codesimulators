type Visitor interface {
    VisitBook(b *Book)
    VisitElectronics(e *Electronics)
}