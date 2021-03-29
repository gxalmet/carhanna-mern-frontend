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
    Button 
} from 'react-bootstrap';
import { readTeam } from '../actions/teamActions';
// import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import RemoveIcon from '@material-ui/icons/Remove';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
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
            // console.log("team");
            // console.log(team);
            setTeamDisplay(team);
            //setTeamPro(teamProject);
        }else{
            dispatch(readTeam());
        }
    }, [dispatch, loading, success, team, teamProject]);

    function userInTeam(id) {
        console.log(teamDisplay.collegues);
        console.log(teamProject);
        console.log(id);
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
            <Table aria-label="simple table">
                <TableBody>
                    {teamDisplay.collegues && 
                    teamDisplay.collegues.map((col,i)=>{
                        
                        if(col._id === projectOwner){
                            return (    
                                <TableRow key={i}>
                                    <TableCell  align="center">{col.name}</TableCell>
                                    <TableCell  align="center">{col.surname}</TableCell>
                                    <TableCell  align="center">{col.email}</TableCell>
                                    <TableCell  align="right"></TableCell>
                                </TableRow> )
                        }else{
                            return (
                                <TableRow key={i}>
                                    <TableCell  align="center">{col.name}</TableCell>
                                    <TableCell  align="center">{col.surname}</TableCell>
                                    <TableCell  align="center">{col.email}</TableCell>
                                    <TableCell  align="right">
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
