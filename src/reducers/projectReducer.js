import {
    PROJECTS_SEARCH_FAIL,
    PROJECTS_SEARCH_REQUEST,
    PROJECTS_SEARCH_SUCCESS,
    PROJECT_CREATE_FAIL,
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_DELETE_FAIL,
    PROJECT_DELETE_REQUEST,
    PROJECT_DELETE_SUCCESS,
    PROJECT_READ_FAIL,
    PROJECT_READ_REQUEST,
    PROJECT_READ_SUCCESS,
    PROJECT_UPDATE_FAIL,
    PROJECT_UPDATE_REQUEST,
    PROJECT_UPDATE_SUCCESS
} from '../constants/projectConstants';



export const createProjectReducer = (state = { loading: true, project: {} }, action) => {
    switch (action.type) {
        case PROJECT_CREATE_REQUEST:
            return { loading: true };
        case PROJECT_CREATE_SUCCESS:
            return { loading: false, project: action.payload };
        case PROJECT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const updateProjectReducer = (state = { loading: false, project: {} }, action) => {

    switch (action.type) {
        case PROJECT_UPDATE_REQUEST:
            return { loading: true };
        case PROJECT_UPDATE_SUCCESS:
            return { loading: false, project: action.payload };
        case PROJECT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const searchProjectsReducer = (state = { loading: true, project: {} }, action) => {
    switch (action.type) {
        case PROJECTS_SEARCH_REQUEST:
            return { loading: true };
        case PROJECTS_SEARCH_SUCCESS:
            return { loading: false, projects: action.payload, success: true };
        case PROJECTS_SEARCH_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}

export const readProjectReducer = (state = { loading: true, project: {} }, action) => {
    switch (action.type) {
        case PROJECT_READ_REQUEST:
            return { loading: true };
        case PROJECT_READ_SUCCESS:
            return { loading: false, project: action.payload, success: true };
        case PROJECT_READ_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}

export const deleteProjectReducer = (state = {}, action) => {
    switch (action.type) {
        case PROJECT_DELETE_REQUEST:
            return { loading: true };
        case PROJECT_DELETE_SUCCESS:
            return { loading: false, project: action.payload, success: true };
        case PROJECT_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}