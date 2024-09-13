import { createReducer, on } from "@ngrx/store";
import { addTitle, loadTitle } from "./title.actions";

export const initialState: string = 'Simulador de investimentos';

export const titleReducer = createReducer(
  initialState,
  on(addTitle, (state, { currentTitle }) => (currentTitle)),
  on(loadTitle, (state) => state)
);
