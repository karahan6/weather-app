import { SET_UNIT } from "../constants";

export const setUnit = (value) => dispatch =>
    dispatch({ type: SET_UNIT, value });
