const INIT_STATE = {
    notes:[]
}
const stateHandler = (state = INIT_STATE, action) => {
    switch(action.type){
        case 'LIST':
            state=action.data;
            return state;
        case 'ADD':
            state.push(action.data);
            return state;
        case 'REMOVE':
            state = state.filter((note)=>note._id!==action.data);
            return state;
        case 'UPDATE':
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
        case 'UNSET':
            state = INIT_STATE;
            return state;
        default :
            return state
    }
}

export default stateHandler;