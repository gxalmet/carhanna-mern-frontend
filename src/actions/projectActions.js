import Axios from 'axios';
import { PROJECTS_SEARCH_FAIL, PROJECTS_SEARCH_REQUEST, PROJECTS_SEARCH_SUCCESS, PROJECT_CREATE_FAIL, PROJECT_CREATE_REQUEST, PROJECT_CREATE_SUCCESS, PROJECT_DELETE_FAIL, PROJECT_DELETE_REQUEST, PROJECT_DELETE_SUCCESS, PROJECT_READ_FAIL, PROJECT_READ_REQUEST, PROJECT_READ_SUCCESS, PROJECT_UPDATE_FAIL, PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_SUCCESS } from '../constants/projectConstants';

const base_url = process.env.REACT_APP_BASE_URL;

export const createProject = (parentId, name, description, level, begin_date, end_date, status, team) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var body = {
        parentId: parentId,
        name: name,
        description: description,
        user_id: userInfo._id,
        level: level,
        begin_date: begin_date,
        end_date: end_date,
        status: status,
        team: team,
    }

    dispatch({ type: PROJECT_CREATE_REQUEST });
    try {
        const url = `${base_url}/api/projects/createproject`;

        const { data } = await Axios.post(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: PROJECT_CREATE_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: PROJECT_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}
export const updateProject = (id, parentId, name, description, begin_date, end_date, status, team) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var body = {
        parentId: parentId,
        name: name,
        description: description,
        begin_date: begin_date,
        end_date: end_date,
        status: status,
        team: team,
    }

    dispatch({ type: PROJECT_UPDATE_REQUEST });
    try {
        const url = `${base_url}/api/projects/updateproject${id}`;

        const { data } = await Axios.put(url, body, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: PROJECT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const searchProjects = (id, parentId, treeflag) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();


    var config = {
        headers: { Authorization: 'Bearer ' + userInfo.token },
        params: {
            id: id,
            parentId: parentId,
            user_id: userInfo ? userInfo._id : null,
            tree: treeflag
        }
    }

    dispatch({ type: PROJECTS_SEARCH_REQUEST });
    try {
        const url = `${base_url}/api/projects/searchprojects`;

        const { data } = await Axios.get(url, config);

        dispatch({ type: PROJECTS_SEARCH_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: PROJECTS_SEARCH_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const readProject = (id) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    var config = {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        },
        params: {
            id: id,
        },

    }

    dispatch({ type: PROJECT_READ_REQUEST });
    try {
        const url = `${base_url}/api/projects/getproject${id}`;

        const { data } = await Axios.get(url, config, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: PROJECT_READ_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: PROJECT_READ_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}
export const deleteProject = (id) => async(dispatch, getState) => {

    const { userSignIn: { userInfo } } = getState();

    dispatch({ type: PROJECT_DELETE_REQUEST });
    try {
        const url = `${base_url}/api/projects/deleteproject${id}`;

        const { data } = await Axios.delete(url, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type: PROJECT_DELETE_SUCCESS, payload: data });


    } catch (error) {
        dispatch({
            type: PROJECT_DELETE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}