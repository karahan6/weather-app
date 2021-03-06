import { updateObject } from '../utils';
import { UPDATE_SPIN, UPDATE_SNACK, SET_UNIT, SET_DATE, SET_CARD_FIRST_INDEX } from "../constants";
import SnackType from '../model/SnackType';

const initialState = {
    snack: {
        type: SnackType.INFO,
        open: false,
        message: "",
    },
    unit: "metric",
    date: undefined,
    cardFirstIndex: 0,
    spin: false
};

export default function ui(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case UPDATE_SNACK: return updateObject(state, {snack: updateObject(state.snack, action.snack)});
        case UPDATE_SPIN: return updateObject(state, {spin: action.spin});
        case SET_UNIT: return updateObject(state, {unit: action.value});
        case SET_DATE: return updateObject(state, {date: action.value});
        case SET_CARD_FIRST_INDEX: return updateObject(state, {cardFirstIndex: action.value});

        default: return state;
    }
}