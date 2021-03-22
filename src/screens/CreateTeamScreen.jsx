import React, { useState } from 'react';
import 
{ 
    useDispatch, 
    useSelector 
} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import { Form, Button } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createTeam } from '../actions/teamActions';
import { useHistory } from 'react-router-dom';
//import Row from '../components/Row';
// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }));
export default function TeamScreen () {
    //const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function submitHandler(e) {
        e.preventDefault();  
        dispatch(createTeam(name));
        
        var ref = '/team';
        history.push(ref);  
    }

    const teamCreate = useSelector(state => state.teamCreate)
    const { 
        loading, 
    //    team, 
        error 
    } = teamCreate;

    return (
        
        <Grid 
            container 
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={11}>
                <Typography variant="h5" align="center" > 
                    My team
                </Typography>
                { loading && ( <LoadingBox>Team Created!!</LoadingBox> ) }
                { error && ( <MessageBox id ="1" variant='danger' mes={error}></MessageBox> ) }
                <Form className="form" onSubmit={submitHandler}>
                    <Form.Group >
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    
                    <br></br>
                    <Button  variant="primary" block type="submit">
                        Save team
                    </Button>
                </Form>
            </Grid>
        </Grid>
       
);
}


