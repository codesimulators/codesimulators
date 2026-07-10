// The abstract factory: makes a MATCHING SET.
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}