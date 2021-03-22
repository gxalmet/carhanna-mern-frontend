import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
//import { teacherListReducer, teacherDetailsReducer, teacherCreateReducer, teacherUpdateReducer, teacherDetailsByUserReducer } from './reducers/teacherListReducer';
import {
    userUpdateReducer,
    userRegisterReducer,
    userSignInReducer,
    userSearchReducer
} from './reducers/userReducer';

import {
    deleteProjectReducer,
    readProjectReducer,
    searchProjectsReducer,
    updateProjectReducer,
    createProjectReducer
} from './reducers/projectReducer';

import {
    createScreamReducer,
    readScreamReducer,
    updateScreamReducer
} from './reducers/screamReducer';

import {
    createTeamReducer,
    readTeamReducer,
    updateTeamReducer
} from './reducers/teamReducers';

const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const reducer = combineReducers({
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    usersSearch: userSearchReducer,

    projectCreate: createProjectReducer,
    projectUpdate: updateProjectReducer,
    projectDelete: deleteProjectReducer,
    projectRead: readProjectReducer,
    projectsSearch: searchProjectsReducer,

    screamCreate: createScreamReducer,
    screamRead: readScreamReducer,
    screamUpdate: updateScreamReducer,

    teamCreate: createTeamReducer,
    teamRead: readTeamReducer,
    teamUpdate: updateTeamReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;