import { Observable } from 'rxjs';

export interface SummatorServiceClient {
  sum: (data: { numbers: number[] }) => Observable<{ result: number }>;
}

export interface GatewayServiceClient {
  add: (data: { a: number; b: number }) => Observable<{ result: number }>;
}
