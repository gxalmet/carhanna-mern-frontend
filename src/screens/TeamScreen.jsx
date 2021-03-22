import React, { useEffect, useState } from 'react';
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
import { readTeam, updateTeam } from '../actions/teamActions';
import Collegues from '../components/Collegues';
import { useHistory } from 'react-router-dom';

import AddCollegue from '../components/AddCollegue';
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
    const [name, setName] = useState('');
    const [collegues, setCollegues] = useState([]);
    const [teamDisplay, setTeamDisplay] = useState({});

    function submitHandler(e) {
        e.preventDefault();  
        dispatch(updateTeam(team._id, name, team.collegues));
    }
    function createTeam(e) {
        e.preventDefault();  
        var ref = '/createteam';
        history.push(ref);  
    }

    const teamRead = useSelector(state => state.teamRead);
    const { loading, team, error, success } = teamRead;

    useEffect(() => {
        if(loading === false){
            setName(team.name);
            setTeamDisplay(team);
            if(team.collegues){
                setCollegues(team.collegues);
            }
        }else{
            dispatch(readTeam());
        }
    }, [dispatch, loading, success, team ]);

    

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
                { teamDisplay ? 
                (   <Form className="form" >
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Team Name</Form.Label>
                            <Form.Control type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>
                        <br></br>
                        <Button  variant="primary" block type="submit" onClick={submitHandler}>
                            Save team
                        </Button> 
                    </Form> ) 
                    : 
                (   <Form className="form" >
                        <Button  variant="primary" block type="submit" onClick={createTeam}>
                            Create team
                        </Button> 
                    </Form> )
                }
                { collegues.length > 0 &&
                    <Collegues collegues={collegues} userId={team.user_id}></Collegues>
                }
                {/* <Button  variant="primary" block type="submit" onClick={createTeam}>
                    Add collegue
                </Button>  */}
                
            </Grid>
            <AddCollegue team ={team}></AddCollegue>
            
        </Grid>
       
);
}


