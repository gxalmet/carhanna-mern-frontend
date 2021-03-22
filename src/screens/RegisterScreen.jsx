
import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import './RegisterScreen.css';
import { Form, Button, Container } from 'react-bootstrap';
//import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function RegisterScreen(props) {
   

    //const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    //const [teacher, setTeacher] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userRegister = useSelector((state)=> state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) =>{
        e.preventDefault();
        if(confirmPassword!==password){
            alert('Password and confirm password are not match');
        }else{
            dispatch(register(name, surname, email, password) );
        }
        
    }

    useEffect(() => {
        if(userInfo){
            props.history.push('/');
        }
    }, [props.history, userInfo]);

    

    return (

        <Container fluid>
            <Container fluid xs={12}>
                <Typography variant="h5" align="center" > 
                    Register
                </Typography>
                <Form className="form" onSubmit={submitHandler}>
                    { loading && ( <LoadingBox>User created!!</LoadingBox> ) }
                    { error && ( <MessageBox id ="1" variant='danger' mes={error}></MessageBox> ) }
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" placeholder="Enter surname" onChange={(e)=>setSurname(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    <br></br>
                    <Button  variant="primary" block type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}
