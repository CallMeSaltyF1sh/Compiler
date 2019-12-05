import * as types from '../constants/actionTypes'

export const sendCodes = codes => ({
    type: types.SEND_CODES,
    data: codes
});

export const sendDotlist = dotlist => ({
    type: types.SEND_DOTLIST,
    data: dotlist
});

export const sendTokenlist = tokenlist => ({
    type: types.SEND_TOKENLIST,
    data: tokenlist
});
