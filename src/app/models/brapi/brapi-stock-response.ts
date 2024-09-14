import { BrapiIndex } from "./brapi-index";
import { BrapiStock } from "./brapi-stock";

export interface BrapiStockResponse {
  indexes: BrapiIndex[],
  stocks: BrapiStock[],
  availableSectors: string[],
  availableStockTypes: string[]
}
