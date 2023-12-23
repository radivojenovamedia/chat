export interface ErrorLoggerInterface {
  timestamp: Date;
  path: string;
  data: string;
  error: string;
  method: string;
  ip: string;
}
