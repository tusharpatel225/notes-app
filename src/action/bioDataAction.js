import * as bioDataService from '../service/bioDataService';
import {SET_BIODATA, UNSET_BIODATA} from "../reducer/bioData";
import {SET_LOADER, UNSET_LOADER} from "../reducer/loader";

export const uploadBioData = (data) => {
    return (dispatch) => {
        dispatch({type : SET_LOADER});
        bioDataService.uploadBioData(data)
            .then((response) => {
                dispatch({type : UNSET_LOADER});
                if (response.status === 200) {
                    dispatch({
                        type: SET_BIODATA,
                        data: data
                    });
                }
            })
            .catch((error) => {
                dispatch({type : UNSET_LOADER});
                if (error) {
                    console.log(error);
                }
            });
    }
};
export const getBioData = () => {
    return (dispatch) => {
        dispatch({type : SET_LOADER});
        bioDataService.getBioData()
            .then((response) => {
                dispatch({type : UNSET_LOADER});
                if (response.status === 200 && response.data.data !== null && response.data.data !== undefined) {
                    dispatch({
                            type: SET_BIODATA,
                            data: response.data.data
                        });
                }
            })
            .catch((error) => {
                dispatch({type : UNSET_LOADER});
                if (error) {
                    console.log(error);
                }
            });
    }
};

export const unSetBioData = () => {
    return (dispatch) => {
        dispatch({type: UNSET_BIODATA});
    }
}



