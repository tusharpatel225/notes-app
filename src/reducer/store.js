import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const composeEnhancer =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancer(
    applyMiddleware(thunk)
);
const INIT_STATE = {
    auth : {
        token: "",
        role: "",
        err: ""
    },
    notes : [],
    bioData : {
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
    },
    isLoading : false
}
if(localStorage.getItem("token"))
    INIT_STATE.auth.token = localStorage.getItem("token");
export default createStore(rootReducer, INIT_STATE, enhancer);
