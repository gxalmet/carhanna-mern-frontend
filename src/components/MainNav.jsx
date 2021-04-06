import React , { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch,  useSelector } from 'react-redux';
import { signOut } from '../actions/userActions';
//import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


import List from '@material-ui/core/List';
//import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';


import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import AccountCircle from '@material-ui/icons/AccountCircle';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import AccessibilityIcon from '@material-ui/icons/Accessibility';
import InputTwoToneIcon from '@material-ui/icons/InputTwoTone';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
//import { Container } from '@material-ui/core';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none' ,
        color: 'grey'
    },
    link: {
      '&:hover': {
        textDecorationStyle: 'none'
      }
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      // width: theme.spacing(7) + 1,      
      width: 0,
      [theme.breakpoints.up('sm')]: {
      //  width: theme.spacing(9) + 1,
        width: 0,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    listMenu: {
      color: 'grey'
    }
  }));

export default function MainNav() {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    //const [anchorEl, setAnchorEl] = useState(null);

    const userSignIn = useSelector((state)=>state.userSignIn);
    const { userInfo } = userSignIn;

    const navigate = (ref) => {
      
      handleDrawerClose();
      history.push(ref);
    }

    const handleDrawerOpen = () => {
      
        setOpen(true);
    };

    const handleDrawerClose = () => {
      
        setOpen(false);
    };
    // const handleChange = (event) => {
    // //  setAuth(event.target.checked);
    // };
  
    // const handleMenu = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
  
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };

    const signOutHandler = () => {
      
      dispatch(signOut());
      history.push("/home");
      
    }
    // var user = '';
    // if(userInfo){
    //   user = userInfo.name + ' ' + userInfo.surname;
    // }
    
    

    return (
         <React.Fragment>
           {/* <React.Fragment className={classes.root}></React.Fragment> */}
            <AppBar
                position="static"
                className={clsx(classes.appBar, { [classes.appBarShift]: open, })}
                color="inherit">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title} onClick={()=>navigate('/home')}> 
                        CARHANNA
                    </Typography>

                    { userInfo &&  ( 
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="false"
                          onClick={() => navigate('/userprofile')}
                          color="inherit"
                          aria-placeholder={userInfo.name}>
                            
                          <AccountCircle placeholder={userInfo.name}></AccountCircle>
                         </IconButton>
                    ) }
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                })}
                classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
                }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                  <ListItem button key="home" onClick={()=>navigate('/home')} className={classes.listMenu}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home"/>
                  </ListItem>
                {
                  userInfo ? (
                    <React.Fragment>
                        <ListItem button key="team" onClick={()=>navigate('/team')} className={classes.listMenu}>
                          <ListItemIcon><GroupWorkIcon /></ListItemIcon>
                          <ListItemText primary="My team"/>
                        </ListItem>
                        <ListItem button key="project" onClick={()=>navigate('/projects')} className={classes.listMenu}>
                          <ListItemIcon><ListIcon/></ListItemIcon>
                          <ListItemText primary="Projects" style={{ color:'grey'}}></ListItemText>
                        </ListItem>
                        <ListItem button key="createproject" onClick={()=>navigate('/createproject')} className={classes.listMenu}>
                          <ListItemIcon><CreateNewFolderIcon /></ListItemIcon>
                          <ListItemText primary="Create project"/>
                        </ListItem>
                        <ListItem button key="agenda" onClick={()=>navigate('/agenda')} className={classes.listMenu}>
                          <ListItemIcon><ViewAgendaIcon /></ListItemIcon>
                          <ListItemText primary="Agenda"/>
                        </ListItem>
                        <ListItem button key="calendar" onClick={()=>navigate('/calendar')} className={classes.listMenu}>
                          <ListItemIcon><CalendarViewDayIcon /></ListItemIcon>
                          <ListItemText primary="Calendar"/>
                        </ListItem>
                        {/* <ListItem button key="chat" onClick={()=>navigate('/chat')} className={classes.listMenu}>
                          <ListItemIcon><ChatIcon /></ListItemIcon>
                          <ListItemText primary="Chat"/>
                        </ListItem> */}
                        <ListItem button key="chatdev" onClick={()=>navigate('/chatdev')} className={classes.listMenu}>
                          <ListItemIcon><ChatIcon /></ListItemIcon>
                          <ListItemText primary="Chat Device"/>
                        </ListItem>
                      <ListItem button key="profile" onClick={()=>navigate('/userprofile')} className={classes.listMenu}>
                        <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                        <ListItemText primary="User profile"/>
                      </ListItem>
                      <ListItem button key="signout" onClick={signOutHandler} className={classes.listMenu}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Sign Out"/>
                      </ListItem>
                    </React.Fragment>
                  ) : 
                  (
                    <React.Fragment>
                      <ListItem button key="login" onClick={()=>navigate('/login')}>
                        <ListItemIcon><AccessibilityIcon /></ListItemIcon>
                        <ListItemText primary="Login"/>
                      </ListItem>
                      <ListItem button key="register" onClick={()=>navigate('/register')}>
                        <ListItemIcon>< InputTwoToneIcon/></ListItemIcon>
                        <ListItemText primary="Register"/>
                      </ListItem>
                    </React.Fragment>
                  )
                }

              </List>
            </Drawer>
            </React.Fragment>
    );
}


