import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL } from '../actionTypes';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

/**
 * login api call
 * @param {Object} data
 */
export const login = (data) => {
    console.log('data==>', data)
    return async dispatch => {
        try {
            // set token in localStorage
            localStorage.setItem('access-token', 'abc123');
            localStorage.setItem('adminId', '123');
            // set token in redux
            dispatch({ type: AUTH_SUCCESS, payload: { token: 'abc123', adminId: 123 } });
        } catch (err) {
            console.log(err)
            dispatch({ type: AUTH_FAIL, payload: {} })
        }
    }
}

/**
 * logout api call
 */
export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('adminId');
        dispatch({ type: AUTH_LOGOUT, payload: {} })
    }
}