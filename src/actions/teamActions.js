import { TEAM_CREATE_FAIL, TEAM_CREATE_REQUEST, TEAM_CREATE_SUCCESS, TEAM_READ_FAIL, TEAM_READ_REQUEST, TEAM_READ_SUCCESS, TEAM_UPDATE_FAIL, TEAM_UPDATE_REQUEST, TEAM_UPDATE_SUCCESS } from "../constants/teamConstants";
import Axios from 'axios';
const base_url = process.env.REACT_APP_BASE_URL;
export const createTeam = (name) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var collegues = [];
    collegues.push(userInfo._id);
    var body = {
        name: name,
        user_id: userInfo._id,
        collegues: collegues
    }

    dispatch({ type: TEAM_CREATE_REQUEST });
    try {
        const url = `${base_url}/api/team/createteam`;

        const { data } = await Axios.post(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: TEAM_CREATE_SUCCESS, payload: data });
        dispatch({ type: TEAM_READ_REQUEST });

    } catch (error) {
        dispatch({
            type: TEAM_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}
export const updateTeam = (id, name, collegues) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var body = {
        name: name,
        user_id: userInfo._id,
        collegues: collegues
    }

    dispatch({ type: TEAM_UPDATE_REQUEST });
    try {
        const url = `${base_url}/api/team/updateteam${id}`;

        const { data } = await Axios.put(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: TEAM_UPDATE_SUCCESS, payload: data });
        dispatch({ type: TEAM_READ_REQUEST });

    } catch (error) {
        dispatch({
            type: TEAM_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const readTeam = () => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var config = {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        },
    }

    const id = userInfo._id;

    dispatch({ type: TEAM_READ_REQUEST });
    try {
        const url = `${base_url}/api/team/getteam${id}`;

        const { data } = await Axios.get(url, config);

        dispatch({ type: TEAM_READ_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: TEAM_READ_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}