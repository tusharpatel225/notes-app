const INIT_STATE = {
    token: "",
    role: "",
    err: ""
}
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_ERR = "LOGIN_ERR";
const stateHandler = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {token: action.data.token, role: action.data.role, err: ""})
        case LOGOUT:
            return Object.assign({}, state, {token: "", role: "", err: ""})
        case LOGIN_ERR:
            return Object.assign({}, state, {err: action.data.err})
        default :
            return state
    }
}

export default stateHandler;