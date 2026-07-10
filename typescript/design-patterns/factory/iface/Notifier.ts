// The product contract every channel must satisfy.
interface Notifier {
  send(msg: string): string;
}