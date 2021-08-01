import { QUERY, CLEAR_QUERY, CLEAR_QUERIES } from "../constants";
import { updateObject } from "../utils";

const initialState = {
    test: "test1"
};

export default function query(state = Object.assign({}, initialState), action) {
    switch (action.type) {
        case QUERY: return updateObject(state, {...state, ...action.addition});
        case CLEAR_QUERY: {
            let result_state = updateObject(state);
            delete  result_state[action.queryName];
            return result_state;
        }
        case CLEAR_QUERIES: return {};
        default: return state;
    }
}
