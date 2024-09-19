import { createAction, props } from "@ngrx/store";

export const toogleLoading = createAction('[Loading component] Toogle loading', props<{ show: boolean }>());

export const loadLoading = createAction('[Loading component] Load loading');
