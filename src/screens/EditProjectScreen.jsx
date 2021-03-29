import 
React, 
{ 
    useState ,
    useEffect 
} from 'react';
import 
{ 
    useDispatch, 
    useSelector 
} from 'react-redux';

import { Form, Button, Row, Col } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { statusList }  from '../constants/statusConstats';
import { updateProject, readProject } from '../actions/projectActions';
import { createScream } from '../actions/screamActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useHistory } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import { convertDate } from  '../utils/utils.js';
import AddCollegueToProject from '../components/AddCollegueToProject';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      
    },

}));
export default function EditProjectScreen(props) {
    const history = useHistory();
    var projectId = props.match.params.id;

    const dispatch = useDispatch();
    const classes = useStyles();
    const projectRead = useSelector((state)=> state.projectRead)  || {};
    const { loading, project, success } = projectRead;

    const projectUpdate = useSelector((state)=> state.projectUpdate);
    // eslint-disable-next-line no-unused-vars
    const { loading: loadingUpdated, project: projectUpdated, success: successUpdated } = projectUpdate;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [begin_date, setBegin_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [status, setStatus] = useState('');
    const [team, setTeam] = useState([])

    function saveProjectButton(e) {
        
        e.preventDefault();  
                                       
        dispatch(updateProject(project._id, null, name, description, begin_date, end_date, status, team ));       
    }

    function createProjectButton(e) {
        
        var ref = '/createproject' + project._id;
        history.push(ref);                        
    }
    function createChatButton(e) {
        
        dispatch(createScream(projectId));                     
    }

    function addIdToTeam(e,id) {
        setTeam(team => team.concat(id)); 
        dispatch(updateProject(project._id, null, name, description, begin_date, end_date, status, team ));  
    }
    function removeIdToTeam(e,id) {
        var array = [...team]; // make a separate copy of the array
        var index = array.indexOf(id)
        if (index !== -1) {
          array.splice(index, 1);
          setTeam(array);
        }
        dispatch(updateProject(project._id, null, name, description, begin_date, end_date, status, team ));  
    }


    useEffect(() => {
        
        if(loading === false){
            if(project && project._id === projectId){
                setName(project.name);
                setDescription(project.description);
                setBegin_date( convertDate(project.begin_date) );
                setEnd_date( convertDate(project.end_date) );
                setStatus(project.status);
                setTeam(project.team);
            }else{
                dispatch(readProject(projectId));
            }   
        }else{
            dispatch(readProject(projectId));
        } 
         
    }, [dispatch, project, props.id, loading, projectId, success]);

    
    

    return (
        <Grid container className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={11}>
                    <Typography variant="h5" align="center" > 
                        Create project
                    </Typography>
                    { loading === true && ( <LoadingBox id="1" mes="Loading data..."></LoadingBox> ) }
                    {/* { success === true && ( <MessageBox id ="2" variant='info' mes="Creación correcta!!"></MessageBox> ) } */}
                    { successUpdated === true && ( <MessageBox id ="2" variant='info' mes="Project saved!!"></MessageBox> ) }
                    <Form className="form" >
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDes">
                            <Form.Label>Description</Form.Label>
                            <Form.Control  as="textarea" rows={3}  defaultValue={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicBegin">
                            <Row>
                                <Col>
                                    <Form.Label>Begin Date</Form.Label>
                                    <Form.Control type="date" defaultValue={begin_date} onChange={(e)=>setBegin_date(e.target.value)}/>
                                </Col>
                                <Col>
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" defaultValue={end_date} onChange={(e)=>setEnd_date(e.target.value)}/>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="StatusControl">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" custom value={status} onChange={(e)=>setStatus(e.target.value)}> 
                                {statusList.map((stat,i)=>{
                                    if(stat === status){
                                        return (<option key={i} value={stat.value} selected="true">{stat.label}</option>)
                                    }else{
                                        return (<option key={i} value={stat.value} >{stat.label}</option>)
                                    }
                                })}
                            </Form.Control>
                        </Form.Group>
                        
                        { project && team &&
                        
                            <AddCollegueToProject 
                                key={project._id}
                                teamProject={team} 
                                projectOwner={project.user_id} 
                                addUserToTeam={addIdToTeam}
                                removeUserToTeam={removeIdToTeam}>
                            </AddCollegueToProject>
                        }
                        
                        <br></br>
                        <Button variant="light" block onClick={saveProjectButton}>
                            <SaveIcon ></SaveIcon>
                        </Button>
                        <Button variant="light" block onClick={createProjectButton}>
                            Create sub-project
                        </Button>
                        <Button variant="light" block onClick={createChatButton}>
                            Create chat
                        </Button>
                    </Form>
                </Grid>
            </Grid>
        </Grid>
    );
}

