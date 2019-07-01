const INIT_STATE = {
        countryId : "",
        stateId : "",
        firstName : "",
        lastName : "",
        gen : "",
        address : "",
        dob : "",
        city : "",
        mno : "",
        hobby : ""
}
export const SET_BIODATA = "SET_BIODATA";
export const UNSET_BIODATA = "UNSET_BIODATA";
const stateHandler = (state = INIT_STATE, action) => {
    switch(action.type){
        case SET_BIODATA:
            state=action.data;
            return state;
        case UNSET_BIODATA:
            state = INIT_STATE;
            return state;
        default :
            return state
    }
}

export default stateHandler;