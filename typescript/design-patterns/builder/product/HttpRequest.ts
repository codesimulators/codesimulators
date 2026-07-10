// The product we want to assemble.
interface HttpRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}