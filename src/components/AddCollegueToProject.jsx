import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { 
    //Form, 
    Button,
    Card 
} from 'react-bootstrap';
import { readTeam } from '../actions/teamActions';
// import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import RemoveIcon from '@material-ui/icons/Remove';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { TableHead, Typography } from '@material-ui/core';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

function AddCollegueToProject({teamProject, projectOwner, addUserToTeam, removeUserToTeam}) {

    const dispatch = useDispatch();
    const [teamDisplay, setTeamDisplay] = useState([]);
    //const [teamPro, setTeamPro] = useState([]);

    const teamRead = useSelector(state => state.teamRead);
    const { 
        loading, 
        team, 
        // error, 
        success 
    } = teamRead;

    useEffect(() => {
        if(success === true ){
            setTeamDisplay(team);
            //setTeamPro(teamProject);
        }else{
            dispatch(readTeam());
        }
    }, [dispatch, loading, success, team, teamProject]);

    function userInTeam(id) {
        if(teamProject){
            return teamProject.includes( id );
        }

    }



    function calladdUserToTeam(e,id){
        e.preventDefault();
        addUserToTeam(e,id);
    }
    function callRemoveUserToTeam(e,id){
        e.preventDefault();
        removeUserToTeam(e,id);
    }

    // console.log("teamDisplay");
    // console.log(teamDisplay);

    return (
        <TableContainer component={Paper}>
            <Card>
                <Card.Body>
                    <Typography variant="subtitle1" align="center" >
                        My collegues in this project.
                    </Typography>
                </Card.Body>
            </Card>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">User</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {teamDisplay.collegues && 
                    teamDisplay.collegues.map((col,i)=>{
                        
                        if(col._id === projectOwner){
                            return (    
                                <TableRow key={i}>
                                    {/* <TableCell  align="center">{col.name}</TableCell>
                                    <TableCell  align="center">{col.surname}</TableCell> */}
                                    <TableCell  align="left">{col.email}</TableCell>
                                    <TableCell  align="left">
                                        <Button title="Project Owner" variant="ligth" block> <HomeWorkIcon/></Button>
                                    </TableCell>
                                </TableRow> )
                        }else{
                            return (
                                <TableRow key={i}>
                                    {/* <TableCell  align="center">{col.name}</TableCell>
                                    <TableCell  align="center">{col.surname}</TableCell> */}
                                    <TableCell  align="left">{col.email}</TableCell>
                                    <TableCell  align="left">
                                        { userInTeam(col._id)
                                        ? 
                                        (<Button title="Remove collegue from project." variant="ligth" block type="submit" onClick={(e)=>callRemoveUserToTeam(e, col._id)}>
                                            <PersonAddDisabledIcon/>
                                        </Button> ) 
                                        : (<Button title="Add collegue from project." variant="ligth" block type="submit" onClick={(e)=>calladdUserToTeam(e, col._id)}>
                                            <PersonAddIcon ></PersonAddIcon>
                                        </Button> ) 
                                        } 
                                    </TableCell>
                                </TableRow> )
                        }
                        
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AddCollegueToProject
