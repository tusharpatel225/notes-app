import * as authService from '../service/auth.js';
import {LOGIN, LOGOUT, LOGIN_ERR} from "../reducer/auth";
import {SET_LOADER, UNSET_LOADER} from "../reducer/loader";

export const loginUser = (credentials) => {
    return (dispatch) => {
        dispatch({type: SET_LOADER});
        authService.login(credentials)
            .then((response) => {
                dispatch({type: UNSET_LOADER});
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    dispatch({
                        type: LOGIN,
                        data: {token: response.data.token, role: "admin"}
                    });
                } else {
                    throw Error();
                }
            })
            .catch((error) => {
                dispatch({type: UNSET_LOADER});
                dispatch({type: LOGIN_ERR, data: {err: "Invalid email or password"}});
            });
    }
};

export const logoutUser = () => {
    let token = localStorage.getItem("token");
    return (dispatch) => {
        dispatch({type: SET_LOADER});
        authService.signOut(token)
            .then((response) => {
                dispatch({type: UNSET_LOADER});
                if (response.status === 200) {
                    localStorage.removeItem("token")
                    dispatch({
                        type: LOGOUT
                    });
                } else {
                    throw Error();
                }
            })
            .catch((error) => {
                dispatch({type: UNSET_LOADER});
                if (error) {
                    dispatch({type: LOGIN_ERR, data: {err: "Invalid token"}});
                }
            });
    }
};

export const signUpUser = (data) => {
    return (dispatch) => {
        dispatch({type: SET_LOADER});
        authService.signUp(data)
            .then((response) => {
                dispatch({type: UNSET_LOADER});
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    dispatch({
                        type: "LOGIN",
                        data: {token: response.data.token, role: "admin"}
                    });
                } else {
                    throw Error();
                }
            })
            .catch((error) => {
                dispatch({type: UNSET_LOADER});
                if (error) {
                    dispatch({type: LOGIN_ERR, data: {err: "email is already exist"}});
                }
            });
    }
};


