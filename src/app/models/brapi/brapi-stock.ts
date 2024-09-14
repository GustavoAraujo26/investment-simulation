export interface BrapiStock {
  stock: string,
  name: string,
  close: number,
  change: number,
  volume: number,
  market_cap: number | null,
  logo: string | null,
  sector: string | null,
  type: string
}
