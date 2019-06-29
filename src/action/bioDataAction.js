import * as bioDataService from '../service/bioDataService';
export const uploadBioData = (data) => {
    return (dispatch) => {
        bioDataService.uploadBioData(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: "SET",
                        data: data
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
export const getBioData = () => {
    return (dispatch) => {
        bioDataService.getBioData()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                            type: "SET",
                            data: response.data.data
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

export const unSetBioData = () => {
    return (dispatch) => {
        dispatch({type: "UNSET"});
    }
}



