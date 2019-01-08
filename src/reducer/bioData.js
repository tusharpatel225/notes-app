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
const stateHandler = (state = INIT_STATE, action) => {
    switch(action.type){
        case 'SET':
            state=action.data;
            return state;
        case 'UNSET':
            state = INIT_STATE;
            return state;
        default :
            return state
    }
}

export default stateHandler;