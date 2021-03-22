import Axios from 'axios';
import { SCREAM_CREATE_FAIL, SCREAM_CREATE_REQUEST, SCREAM_CREATE_SUCCESS, SCREAM_READ_FAIL, SCREAM_READ_REQUEST, SCREAM_READ_SUCCESS, SCREAM_UPDATE_FAIL, SCREAM_UPDATE_REQUEST, SCREAM_UPDATE_SUCCESS } from '../constants/screamConstants';
const base_url = process.env.REACT_APP_BASE_URL;

export const createScream = (projectId) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var body = {
        projectId: projectId,
        userId: userInfo._id,
        content: 'First Comment!!!!'
    }

    dispatch({ type: SCREAM_CREATE_REQUEST });
    try {
        const url = `${base_url}/api/scream/createscream`;

        const { data } = await Axios.post(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: SCREAM_CREATE_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: SCREAM_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}
export const updateScream = (id, content) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var body = {
        userId: userInfo._id,
        content: content
    }

    dispatch({ type: SCREAM_UPDATE_REQUEST });
    try {
        const url = `${base_url}/api/scream/updatescream${id}`;

        const { data } = await Axios.put(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: SCREAM_UPDATE_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: SCREAM_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}



export const readScream = (projectId) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var config = {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
    };

    dispatch({ type: SCREAM_READ_REQUEST });
    try {
        const url = `${base_url}/api/scream/getscream${projectId}`;

        const { data } = await Axios.get(url, config);

        dispatch({ type: SCREAM_READ_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: SCREAM_READ_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}
export const deleteProject = (id) => async(dispatch, getState) => {

    //const { userSignIn: { userInfo } } = getState();

}