import { SET_UNIT, SET_DATE } from "../constants";

export const setUnit = (value) => dispatch =>{
    dispatch({ type: SET_UNIT, value });
    return Promise.resolve();
}

export const setSelectedDate = (value) => dispatch =>
    dispatch({ type: SET_DATE, value });
