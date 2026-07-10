// Observer: anything that wants price updates.
interface Observer {
  update(price: number): void;
}