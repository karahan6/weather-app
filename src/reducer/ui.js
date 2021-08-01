import { updateObject } from '../utils';
import { UPDATE_SPIN, UPDATE_SNACK } from "../constants";
import SnackType from '../model/SnackType';

const initialState = {
    snack: {
        type: SnackType.INFO,
        open: false,
        message: "",
    },
    spin: {
        spinning: false,
        tip: null
    }
};

export default function ui(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case UPDATE_SNACK: return updateObject(state, {snack: updateObject(state.snack, action.snack)});
        case UPDATE_SPIN: return updateObject(state, {spin: updateObject(state.spin, action.spin)});
        default: return state;
    }
}