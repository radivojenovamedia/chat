export interface ControllerLoggerInterface {
  timestamp: Date;
  method: string;
  ip: string;
  query: string;
  param: string;
  body: string;
  path: string;
  headers: string;
}
