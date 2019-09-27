import React, {useState} from "react";
import noteReducer from "../reducer/notes";

const test = (props) => {
    function useReducer(reducer, initialState) {
        const [state, setState] = useState(initialState);

        function dispatch(action) {
            const nextState = reducer(state, action);
            setState(nextState);
        }
        return [state, dispatch];
    }
    const [todos, dispatch] = useReducer(noteReducer, []);
    return(
        <div>
            {todos.length}
            <button onClick={() => {
                dispatch({ type: 'ADD_NOTE', data : {title:""} });
            }}>Click</button>
        </div>
    )
}
export default test;