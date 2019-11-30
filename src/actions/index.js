import * as types from '../constants/actionTypes'

export const sendCodes = codes => ({
    type: types.SEND_CODES,
    codes: codes
});
