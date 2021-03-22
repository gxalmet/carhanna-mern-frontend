import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form, Button } from 'react-bootstrap';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import { search } from '../actions/userActions';
import { updateTeam } from '../actions/teamActions';
//import { Container } from '@material-ui/core';

function AddCollegue(props) {

    const team = props.team;
    const dispatch = useDispatch();
    const [fieldSearch, setFieldSearch] = useState('')

    const usersSearch = useSelector(state => state.usersSearch);
    const { loading, users, success, error } = usersSearch;

    function searchUsers(e) {
        e.preventDefault();  
        dispatch(search(fieldSearch));
    }
    function addToTeam(id) {
        // console.log(team);
        team.collegues.push(id);
        dispatch(updateTeam(team._id, team.name, team.collegues));
    }

    return (   
        <Grid item xs={11}>
            <Typography variant="h6" align="center" style={{ paddingTop: '5rem'}}> 
                Search users to add to your team
            </Typography>
            { loading && ( <LoadingBox mes ='Searching users'></LoadingBox> ) }
            { error && ( <MessageBox id ="1" variant='danger' mes={error}></MessageBox> ) }
            { success && ( <LoadingBox mes ='Search success...'></LoadingBox> ) }
            <Form className="form" >
                <Form.Group controlId="formBasicText">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control type="text" defaultValue={fieldSearch} onChange={(e)=>setFieldSearch(e.target.value)}/>
                </Form.Group>
                <br></br>
                <Button  variant="primary" block type="submit" onClick={searchUsers}>
                    Search users
                </Button> 
            </Form>
            { users && users.length > 0 &&
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Surname</TableCell>
                            <TableCell align="center">E-mail</TableCell>
                            <TableCell align="left">Add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((col,i)=>{
                            return (
                            <TableRow key={col._id}>
                                <TableCell  align="center">{col.name}</TableCell>
                                <TableCell  align="center">{col.surname}</TableCell>
                                <TableCell  align="center">{col.email}</TableCell>
                                <TableCell  align="right">
                                    <Button  variant="primary" block type="submit" onClick={(e)=>addToTeam(col._id)}>
                                        Add to team
                                    </Button>
                                </TableCell>
                            </TableRow> )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            }

        </Grid>
        
    )
} 


export default AddCollegue
