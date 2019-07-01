const INIT_STATE = {
    notes:[]
}
export const ADD_NOTE = "ADD_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const LIST_NOTE = "LIST_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const UNSET_NOTE = "UNSET_NOTE";
const stateHandler = (state = INIT_STATE, action) => {
    switch(action.type){
        case LIST_NOTE:
            state = action.data;
            return state;
        case ADD_NOTE:
            let tempData = [];
            if(state.length > 0){
                tempData = [...state];
            }
            tempData.push(action.data);
            state = tempData;
            return state;
        case DELETE_NOTE:
            state = state.filter((note)=>note._id!==action.data);
            return state;
        case UPDATE_NOTE:
            let notes = state.filter((note)=> {
                if(note._id===action.data._id) {
                    note.title=action.data.title;
                    note.body=action.data.body;
                    return note;
                }
                return note;
            });
            state = notes;
            return state;
        case UNSET_NOTE:
            state = INIT_STATE;
            return state;
        default :
            return state
    }
}

export default stateHandler;