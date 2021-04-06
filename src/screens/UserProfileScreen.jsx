import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { update } from '../actions/userActions';
import 
{
    Form,
    Button
} 
from 'react-bootstrap';

//import { makeStyles } from '@material-ui/core/styles';

//import Grid from '@material-ui/core/Grid';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Container, Card } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(4),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
// }));

export default function UserProfileScreen(props) {

    //const classes = useStyles();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [teacher, setTeacher] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPass, setErrorPass] = useState('');

    const [successState, setSuccessState] = useState(false);
    const dispatch = useDispatch();
    
    const userSignIn = useSelector((state)=>state.userSignIn);
    
    const { userInfo } = userSignIn;
    
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;
    

    useEffect(() => {
        //dispatch(signIn(userInfo._id));
        if(userInfo){
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setEmail(userInfo.email);
            setPassword(userInfo.password);
            //setTeacher(userInfo.teacher);
        }


    }, [dispatch, userInfo]);

    const submitHandler = (e) =>{
        e.preventDefault();
        setErrorPass('');
        if(password && password !== confirmPassword){
            setErrorPass('Password and confirm password are not match');
            setSuccessState(false);
        }else{
            dispatch(update({ userId: userInfo._id, email, name, surname, password }));
            setSuccessState(success);
        }  
    }
    return (
        <Container fluid>
            <Container fluid xs={12}>
                <Card >
                    <Card.Body>
                        <Typography variant="h5" align="center" > 
                            User Profile
                        </Typography>
                    </Card.Body>
                </Card>
                <Form className="form" onSubmit={submitHandler}>
                    { loading && ( <LoadingBox>Loading...</LoadingBox> )}
                    { error && ( <MessageBox variant='danger'>{error}</MessageBox> ) }
                    { errorPass && ( <MessageBox variant='danger'>{errorPass}</MessageBox> ) }
                    { successState && ( <MessageBox variant='info'>Profile Saved</MessageBox> ) }
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            defaultValue = {email} 
                            onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            defaultValue = {name} 
                            onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control 
                            type="text" 
                            defaultValue = {surname} 
                            onChange={(e)=>setSurname(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    <Button  variant="primary" block type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}


