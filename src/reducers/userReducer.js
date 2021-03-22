import {

    USERS_SEARCH_FAIL,
    USERS_SEARCH_REQUEST,
    USERS_SEARCH_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants/userConstants";

export const userSignInReducer = (state = { loading: true, user: {} }, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = { loading: false, user: {} }, action) => {

    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:

            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}

export const userSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case USERS_SEARCH_REQUEST:
            return { loading: true };
        case USERS_SEARCH_SUCCESS:
            return { loading: false, users: action.payload, success: true };
        case USERS_SEARCH_FAIL:
            return { loading: false, error: action.payload, success: false };
        default:
            return state;
    }
}