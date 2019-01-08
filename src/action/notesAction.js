import * as notesService from '../service/notesService';
export const addNote = (note) => {
    //console.log("note in action", note);
    return (dispatch) => {
        notesService.addNote(note)
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data);
                    dispatch({
                        type: "ADD",
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                    //dispatch({ type: "ERR", data: { err: error } });
                }
            });
    }
};
export const getNotes = () => {

    return (dispatch) => {
        notesService.getNotes()
            .then((response) => {
                if (response.status === 200) {
                    return dispatch({
                            type: "LIST",
                            data:response.data.notes
                        });
                }
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                    //dispatch({ type: "ERR", data: { err: error } });
                }
            });
    }
};
export const deleteNote = (id) => {

    return (dispatch) => {
        notesService.deleteNote(id)
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response.data.note._id);
                    dispatch({
                        type: "REMOVE",
                        data: response.data.note._id
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                    //dispatch({ type: "ERR", data: { err: error } });
                }
            });
    }
};
export const updateNote = (note) => {

    return (dispatch) => {
        notesService.updateNote(note)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: "UPDATE",
                        data: note
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    console.log(error);
                    //dispatch({ type: "ERR", data: { err: error } });
                }
            });
    }
};

export const unSetNotes = () => {
    return (dispatch) => {
        dispatch({type: "UNSET"});
    }
}
