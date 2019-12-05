import * as types from '../constants/actionTypes';

const initialState = {
    codes: "",
    dotlist: [],
    tokenlist: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEND_CODES:
            return {
                ...state,
                codes: action.data
            }
        case types.SEND_DOTLIST:
            return {
                ...state,
                dotlist: action.data
            }
        case types.SEND_TOKENLIST:
            return {
                ...state,
                tokenlist: action.data
            }
        default:
            return state
    }
};

export const getCodes = state => state.codes;
export const getDotlist = state => state.dotlist;
export const getTokenlist = state => state.tokenlist;