import * as notesService from '../service/notesService';
import {ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, LIST_NOTE, UNSET_NOTE} from "../reducer/notes";
import {SET_LOADER, UNSET_LOADER} from "../reducer/loader";

export const addNote = (note) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({type: SET_LOADER});
            notesService.addNote(note)
                .then((response) => {
                    dispatch({type: UNSET_LOADER});
                    if (response.status === 200) {
                        dispatch({
                            type: ADD_NOTE,
                            data: response.data
                        });
                    } else {
                        throw Error("cant add note");
                    }
                    resolve();
                })
                .catch((error) => {
                    dispatch({type: UNSET_LOADER});
                    if (error) {
                        console.log(error);
                    }
                    reject();
                });
        });
    }
};
export const getNotes = () => {
    return (dispatch) => {
        dispatch({type: SET_LOADER});
        notesService.getNotes()
            .then((response) => {
                dispatch({type: UNSET_LOADER});
                if (response.status === 200 && response.data !== null && response.data.notes.length > 0) {
                    return dispatch({
                        type: LIST_NOTE,
                        data: response.data.notes
                    });
                } else {
                    throw Error("notes not found");
                }
            })
            .catch((error) => {
                dispatch({type: UNSET_LOADER});
                if (error) {
                    console.log(error);
                }
            });
    }
};
export const deleteNote = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({type: SET_LOADER});
            notesService.deleteNote(id)
                .then((response) => {
                    dispatch({type: UNSET_LOADER});
                    if (response.status === 200) {
                        dispatch({
                            type: DELETE_NOTE,
                            data: response.data.note._id
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    dispatch({type: UNSET_LOADER});
                    if (error) {
                        console.log(error);
                    }
                    reject();
                });
        });
    }
};
export const updateNote = (note) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({type: SET_LOADER});
            notesService.updateNote(note)
                .then((response) => {
                    dispatch({type: UNSET_LOADER});
                    if (response.status === 200) {
                        dispatch({
                            type: UPDATE_NOTE,
                            data: note
                        });
                    }
                    resolve();
                })
                .catch((error) => {
                    dispatch({type: UNSET_LOADER});
                    if (error) {
                        console.log(error);
                    }
                     reject();
                });
        });
    }
};

export const unSetNotes = () => {
    return (dispatch) => {
        dispatch({type: UNSET_NOTE});
    }
}
