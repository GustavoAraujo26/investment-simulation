import { createAction, props } from "@ngrx/store";

export const addTitle = createAction('[Title Page] Add title', props<{ currentTitle: string }>());

export const loadTitle = createAction('[Title Page] Load title');
