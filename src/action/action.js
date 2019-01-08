import * as authService from '../service/auth.js';
export const loginUser = (credentials) => {
    return (dispatch) => {
        authService.login(credentials)
            .then((response) => {
                //console.log(response.data);
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    dispatch({
                        type: "LOGIN",
                        data: { token: response.data.token, role:"admin"}   
                    });
                }
            })
            .catch((error) => {
                dispatch({ type: "ERR", data: { err: "Invalid email or password" } });
            });
    }
};

export const logoutUser = () => {
    let token = localStorage.getItem("token");
    return (dispatch) => {
        authService.signOut(token)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem("token")
                    dispatch({
                        type: "LOGOUT"
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: "ERR", data: { err: "Invalid token" } });
                }
            });
        
    }
};

export const signUpUser = (data) => {
    return (dispatch) => {
        authService.signUp(data)
            .then((response) => {
                //console.log(response.data);
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token)
                    dispatch({
                        type: "LOGIN",
                        data: { token: response.data.token, role:"admin"}   
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: "ERR", data: { err: "email is already exist" } });
                }
            });
    }
};


