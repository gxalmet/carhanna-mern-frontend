import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form, Button, Col, Card } from 'react-bootstrap';
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
// import { readTeam, updateTeam } from '../actions/teamActions';
//import { Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import RemoveIcon from '@material-ui/icons/Remove';
// import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
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
    function addToTeam(user) {
        console.log(user);
        team.collegues.push(user._id);
        // dispatch(updateTeam(team._id, team.name, team.collegues));
        // dispatch(readTeam());
        users.usersResult.splice(users.usersResult.findIndex(function(usersearch){
            return usersearch._id === user._id;
        }), 1);
        props.action();
    }

    //console.log(users);
    return (   
        <Grid item xs={12}>
            <Card>
                <Card.Body>
                <Form className="form" >
                    <Typography variant="h6" align="center" style={{ paddingTop: '5rem'}}> 
                        Search users to add to your team
                    </Typography>
                    </Form>
                </Card.Body>
            </Card>
            { loading && ( <LoadingBox mes ='Searching users'></LoadingBox> ) }
            { error && ( <MessageBox id ="1" variant='danger' mes={error}></MessageBox> ) }
            { success && ( <LoadingBox mes ='Search success...'></LoadingBox> ) }
            <Card>
                <Card.Body>
                    <Form className="form" >
                        <Form.Row>
                            <Col sm="12">
                                <Form.Label>User Name</Form.Label>
                            </Col>
                        </Form.Row>
                        
                        <Form.Row>
                            <Col sm="11">
                                <Form.Group controlId="formBasicText">
                                    <Form.Control type="text" defaultValue={fieldSearch} onChange={(e)=>setFieldSearch(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Button  variant="light" block type="submit" onClick={searchUsers} title="Search">
                                    <SearchIcon ></SearchIcon>
                                </Button> 
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
            { users &&  users.usersResult.length > 0 &&
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ width: '90%' }}>E-mail</TableCell>
                            <TableCell align="left" size="small">Add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { users.usersResult.map((user,i)=>{
                            console.log(user._id);
                            console.log(i);
                            return (
                            <TableRow key={i}>
                                {/* <TableCell  align="center">{col.name}</TableCell>
                                <TableCell  align="center">{col.surname}</TableCell> */}
                                <TableCell  align="center">{user.email}</TableCell>
                                <TableCell  align="right">
                                    <Button  variant="light" block type="submit" onClick={()=>addToTeam(user)} title="Add to team">
                                        <PersonAddIcon ></PersonAddIcon>
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
