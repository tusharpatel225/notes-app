const INIT_STATE = {
    isLoading: false
}
export const SET_LOADER = "SET_LOADER";
export const UNSET_LOADER = "UNSET_LOADER";
const stateHandler = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_LOADER:
            return true;
        case UNSET_LOADER:
            return false;
        default :
            return state
    }
}

export default stateHandler;