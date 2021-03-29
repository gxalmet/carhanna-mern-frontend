import React, { useEffect, useState } from 'react';
import 
{ 
    useDispatch, 
    useSelector 
} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import { Form, Button, Card, Container, Col } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { readTeam, updateTeam } from '../actions/teamActions';
import Collegues from '../components/Collegues';
import { useHistory } from 'react-router-dom';
import AddCollegue from '../components/AddCollegue';
import SaveIcon from '@material-ui/icons/Save';

export default function TeamScreen () {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);

    const [name, setName] = useState('');
    // const [collegues, setCollegues] = useState([]);
    const [teamDisplay, setTeamDisplay] = useState({});

    const teamRead = useSelector(state => state.teamRead);
    const { loading, team, error, success } = teamRead;

    function updateTeamButton(e) {
        //e.preventDefault();  
        
        dispatch(updateTeam(team._id, name, team.collegues));
        dispatch(readTeam());   
        setRefresh(true);
    }
    function createTeam(e) {
        e.preventDefault();  
        var ref = '/createteam';
        history.push(ref);  
    }

    


    useEffect(() => {
        
        if(loading === false){
            if(success === true){
                setTeamDisplay(team);
                setName(team.name);
                // if(team.collegues){
                //     setCollegues(team.collegues);
                // }
            }else{
                if(!success === true){
                    dispatch(readTeam());   
                }
                 
            }
        }
        if(refresh === true){
            dispatch(readTeam()); 
            setRefresh(false);
        }
        // else{
        //     dispatch(readTeam()); 
        // }
    }, [dispatch, error, loading, refresh, success, team]);



    return (
        
        <Container fluid>
            <Grid item xs={12}>
                <Typography variant="h5" align="center" >My team</Typography>
                { loading && ( <LoadingBox mes="Manage your team"></LoadingBox> ) }
                { error && ( <MessageBox id ="1" variant='danger' mes={error}></MessageBox> ) }
                { teamDisplay ? 
                (   
                    <Card>
                        <Card.Body>
                            <Form className="form" >
                                <Form.Row>
                                    <Col sm="11">
                                        
                                        <Form.Group controlId="formBasicText">
                                            {/* <Form.Label>Team Name</Form.Label> */}
                                            <Form.Control type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col>
                                        <Button  variant="light" block type="submit" onClick={updateTeamButton} title="Save team">
                                            <SaveIcon ></SaveIcon>
                                        </Button> 
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                )
                    : 
                (   <Form className="form" >
                        <Button  variant="primary" block type="submit" onClick={createTeam}>
                            Create team
                        </Button> 
                    </Form> )
                }
                { team && 
                    <Collegues team ={team} action={updateTeamButton}></Collegues>
                }  
                <AddCollegue team ={team} action={updateTeamButton}></AddCollegue>
            </Grid>
            
            
        </Container>
       
);
}


