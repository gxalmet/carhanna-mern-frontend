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

function AddCollegueToProject({teamProject, projectOwner, addUserToTeam, removeUserToTeam}) {

    const dispatch = useDispatch();
    const [teamDisplay, setTeamDisplay] = useState({});
    //const [teamPro, setTeamPro] = useState([]);

    const teamRead = useSelector(state => state.teamRead);
    const { loading, team, error, success } = teamRead;

    useEffect(() => {
        if(loading === false){
            
            setTeamDisplay(team);
            //setTeamPro(teamProject);
            
        }else{
            dispatch(readTeam());
        }
    }, [dispatch, loading, success, team, teamProject]);

    function userInTeam(id) {
        if(teamProject){
            var findId = teamProject.find(col => col === id );
        }
        if(findId){
            return true;
        }else{
            return false;
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

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    {teamDisplay.collegues && 
                    teamDisplay.collegues.map((col,i)=>{
                        if(col._id === projectOwner){
                            return (    
                                <TableRow key={col._id}>
                                    <TableCell  align="center">{col.name}</TableCell>
                                    <TableCell  align="center">{col.surname}</TableCell>
                                    <TableCell  align="center">{col.email}</TableCell>
                                    <TableCell  align="right"></TableCell>
                                </TableRow> )
                        }else{
                            return (
                                <TableRow key={col._id}>
                                    <TableCell  align="center">{col.name}</TableCell>
                                    <TableCell  align="center">{col.surname}</TableCell>
                                    <TableCell  align="center">{col.email}</TableCell>
                                    <TableCell  align="right">
                                        { userInTeam(col._id)
                                        ? 
                                        (<Button  variant="secondary" block type="submit" onClick={(e)=>callRemoveUserToTeam(e, col._id)}>
                                            Erase from project
                                        </Button> ) 
                                        : (<Button  variant="primary" block type="submit" onClick={(e)=>calladdUserToTeam(e, col._id)}>
                                            Add to project
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
