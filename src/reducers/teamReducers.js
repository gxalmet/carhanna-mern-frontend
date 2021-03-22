import { TEAM_CREATE_FAIL, TEAM_CREATE_REQUEST, TEAM_CREATE_SUCCESS, TEAM_READ_FAIL, TEAM_READ_REQUEST, TEAM_READ_SUCCESS, TEAM_UPDATE_FAIL, TEAM_UPDATE_REQUEST, TEAM_UPDATE_SUCCESS } from "../constants/teamConstants";

export const createTeamReducer = (state = { loading: false, team: {} }, action) => {
    switch (action.type) {
        case TEAM_CREATE_REQUEST:
            return { loading: true };
        case TEAM_CREATE_SUCCESS:
            return { loading: false, team: action.payload };
        case TEAM_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const updateTeamReducer = (state = { loading: false, team: {} }, action) => {

    switch (action.type) {
        case TEAM_UPDATE_REQUEST:
            return { loading: true };
        case TEAM_UPDATE_SUCCESS:
            return { loading: false, team: action.payload };
        case TEAM_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const readTeamReducer = (state = { loading: true, team: {} }, action) => {
    switch (action.type) {
        case TEAM_READ_REQUEST:
            return { loading: true };
        case TEAM_READ_SUCCESS:
            return { loading: false, team: action.payload, success: true };
        case TEAM_READ_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}