import { createReducer, on } from "@ngrx/store";
import { loadLoading, toogleLoading } from "./loading.actions";

export const initialState: boolean = false;

export const loadingReducer = createReducer(
  initialState,
  on(toogleLoading, (state, { show }) => (show)),
  on(loadLoading, (state) => state)
);
