import { createAction, props } from "@ngrx/store";
import { BrapiResponse } from "../../models/brapi/brapi-response";

export const saveResponse = createAction('[Brapi Response] Save response', props<{ response: BrapiResponse }>());

export const loadResponse = createAction('[Brapi Response] Load response');
