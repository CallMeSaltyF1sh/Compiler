import * as types from '../constants/actionTypes'

export const sendCode = () => dispatch => {
    dispatch({
        type: types.SEND_CODE
    })
}