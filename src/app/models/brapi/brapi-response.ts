import { BrapiStockResponse } from "./brapi-stock-response";

export interface BrapiResponse {
  period: string,
  response: BrapiStockResponse
}
