import React from 'react';
// import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AgendaScreen from '../screens/AgendaScreen';
import EditProjectScreen from '../screens/EditProjectScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatDevScreen from '../screens/ChatDevScreen';
import ScreamsScreen from '../screens/ScreamsScreen';
import TeamScreen from '../screens/TeamScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';

export default function Router(){

    // const userSignIn = useSelector((state)=>state.userSignIn);
    // const { userInfo } = userSignIn;
    

    return (
        <Switch>
            <Route path="/home" exact component={HomeScreen}></Route>
            {/* {
                userInfo && (<Route path="/" exact={true} component={HomeScreen}>Profile</Route>)
            } */}
        
            
            <Route path="/login"  component={LoginScreen}></Route>
            <Route path="/register"  component={RegisterScreen}></Route>
            <Route path="/projects"  component={ProjectsScreen}></Route>
            <Route path="/createproject:id?"  component={CreateProjectScreen}></Route>
            <Route path="/editproject:id"  component={EditProjectScreen}></Route>
            <Route path="/calendar"  component={CalendarScreen}></Route>
            <Route path="/agenda" component={AgendaScreen}></Route> 
            <Route path="/userprofile" component={UserProfileScreen}></Route> 
            <Route path="/chat" component={ChatScreen}></Route>
            <Route path="/chatdev" component={ChatDevScreen}></Route>
            <Route path="/screams:id" component={ScreamsScreen}></Route>
            <Route path="/team" component={TeamScreen}></Route>
            <Route path="/createteam" component={CreateTeamScreen}></Route>
        </Switch>
    );
}


