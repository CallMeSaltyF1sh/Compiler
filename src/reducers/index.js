import * as types from '../constants/actionTypes';

const initialState = {
    codes: ""
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEND_CODES:
            return {
                codes: action.codes
            }
        default:
            return state
    }
};

export const getCodes = state => state.codes;