import 
React, 
{ 
    useState ,
//    useEffect 
} from 'react';
import 
{ 
    useDispatch, 
    useSelector 
} from 'react-redux';

import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { statusList }  from '../constants/statusConstats';
import { createProject } from '../actions/projectActions';
//import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SaveIcon from '@material-ui/icons/Save';
// import { makeStyles } from '@material-ui/core';
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
// }));
export default function CreateProjectScreen(props) {
    var parentId = props.match.params.id;
    
    const dispatch = useDispatch();
    //const classes = useStyles();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [begin_date, setBegin_date] = useState(new Date());
    const [end_date, setEnd_date] = useState(new Date());
    const [status, setStatus] = useState('1');
    const [button, setButton] = useState(false);
    const projectCreate = useSelector((state)=> state.projectCreate);
    // console.log(projectCreate);
    const { 
    //    loading, 
    //    project, 
        
        // success,
        error 
    } = projectCreate;

    const userSignIn = useSelector((state)=> state.userSignIn);
    const { userInfo } = userSignIn;

    function createProjectButton(e) {
        
        e.preventDefault();  
        var team = [];
        team.push(userInfo._id);
        dispatch(createProject( parentId, name, description, '1', begin_date, end_date, status, team ));
        setButton(true);    
    }

    return (

        <Container fluid>
            <Grid item xs={12}>
            <Card >
                <Card.Body>
                    <Typography variant="h5" align="center" > 
                        Create project
                    </Typography>
                </Card.Body>
            </Card>
            {/* { loading === true && ( <LoadingBox id="1" mes="Loading data..."></LoadingBox> ) } */}
            {/* { success && ( <MessageBox id ="2" variant='info' mes="Creación correcta!!"></MessageBox> ) } */}
            { error ? 
            ( <MessageBox id ="2" variant='danger' mes={error}></MessageBox> ) : 
            ( <MessageBox id ="2" variant='info' mes="Creación correcta!!"></MessageBox> )}
            <Form className="form" onSubmit={createProjectButton}>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicDes">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  as="textarea" rows={3} placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicBegin">
                    <Row>
                        <Col>
                            <Form.Label>Begin Date</Form.Label>
                            <Form.Control type="date"  onChange={(e)=>setBegin_date(e.target.value)}/>
                        </Col>
                        <Col>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date"  onChange={(e)=>setEnd_date(e.target.value)}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="StatusControl">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" custom onChange={(e)=>setStatus(e.target.value)}> 
                        {statusList.map((stat,i)=>{
                            return (<option key={i} value={stat.value}>{stat.label}</option>)
                        })}
                        
                        {/* <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option> */}
                    </Form.Control>
                </Form.Group>
                <br></br>
                
                <Button variant="ligth" block type="submit" disabled={button}>
                    <SaveIcon ></SaveIcon>
                </Button> 
                
            </Form>
            </Grid>
        </Container>

    );
}


