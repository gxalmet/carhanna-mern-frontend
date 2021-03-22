import { SCREAM_CREATE_FAIL, SCREAM_CREATE_REQUEST, SCREAM_CREATE_SUCCESS, SCREAM_DELETE_FAIL, SCREAM_DELETE_REQUEST, SCREAM_DELETE_SUCCESS, SCREAM_READ_FAIL, SCREAM_READ_REQUEST, SCREAM_READ_SUCCESS, SCREAM_UPDATE_FAIL, SCREAM_UPDATE_REQUEST, SCREAM_UPDATE_SUCCESS } from "../constants/screamConstants";


export const createScreamReducer = (state = { loading: true, scream: {} }, action) => {
    switch (action.type) {
        case SCREAM_CREATE_REQUEST:
            return { loading: true };
        case SCREAM_CREATE_SUCCESS:
            return { loading: false, project: action.payload };
        case SCREAM_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const updateScreamReducer = (state = { loading: false, scream: {} }, action) => {

    switch (action.type) {
        case SCREAM_UPDATE_REQUEST:
            return { loading: true };
        case SCREAM_UPDATE_SUCCESS:
            return { loading: false, scream: action.payload };
        case SCREAM_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const readScreamReducer = (state = { loading: true, scream: {} }, action) => {
    switch (action.type) {
        case SCREAM_READ_REQUEST:
            return { loading: true };
        case SCREAM_READ_SUCCESS:
            return { loading: false, scream: action.payload, success: true };
        case SCREAM_READ_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}

export const deleteScreamReducer = (state = {}, action) => {
    switch (action.type) {
        case SCREAM_DELETE_REQUEST:
            return { loading: true };
        case SCREAM_DELETE_SUCCESS:
            return { loading: false, scream: action.payload, success: true };
        case SCREAM_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}