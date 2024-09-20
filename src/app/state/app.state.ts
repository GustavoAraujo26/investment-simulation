import { BrapiResponse } from "../models/brapi/brapi-response";

export interface AppState {
  title: string,
  loading: boolean,
  brapiResponse: BrapiResponse
}
