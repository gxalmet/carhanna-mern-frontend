import React from 'react'
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
// import RemoveIcon from '@material-ui/icons/Remove';
import { Button} from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { readTeam, updateTeam } from '../actions/teamActions';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
function Collegues(props) {

    const team = props.team;
    const collegues = props.team.collegues;
    const userId = props.team.user_id;

    

    //const dispatch = useDispatch();
    //const userId = props.userId;
    function removeToTeam(id) {
        // console.log(team);
        team.collegues.splice(team.collegues.findIndex(function(i){
            return i.id === id;
        }), 1);
        //team.collegues.push(id);
        // dispatch(updateTeam(team._id, team.name, team.collegues));
        // dispatch(readTeam());
        props.action();
    }
    

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" >Name</TableCell>
                        <TableCell align="center" >Surname</TableCell>
                        <TableCell align="center" >E-mail</TableCell>
                        <TableCell  align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                { collegues &&
                  collegues.map((col,i)=>{
                    
                    return (
                    <TableRow key={i}>
                        <TableCell  align="center">{col.name}</TableCell>
                        <TableCell  align="center">{col.surname}</TableCell>
                        <TableCell  align="center">{col.email}</TableCell>
                        <TableCell  align="center">
                            { col._id !== userId ? (
                                <Button key={i} variant="ligth" block type="submit" onClick={(e)=>removeToTeam(col)} title="Save team">
                                    <PersonAddDisabledIcon></PersonAddDisabledIcon>
                                </Button>
                            ) : (
                                <div>Owner</div>
                            )}
                        </TableCell>
                    </TableRow> )
                })}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Collegues
