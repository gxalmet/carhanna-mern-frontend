import 
React, 
{ 
    useState, 
    useEffect 
} from 'react';
//import Grid from '@material-ui/core/Grid';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';


import 
{ 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { searchProjects } from '../actions/projectActions';
// import { makeStyles } from '@material-ui/core/styles';
//import Box from '@material-ui/core/Box';
//import ScreamsScreen from './ScreamsScreen';


// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1
//     },
//     // paper: {
//     //   height: 140,
//     //   width: 100,
//     // },
//     header: {
//         border: '.2rem solid grey', 
//         borderRadius:'.5rem', 
//         padding: '.3rem',
//         color: 'grey',
//         backgroundColor: '#f5f5f5'
//     },
//     projectList: {
//     //    border: '.1rem solid #f5f5f5', 
//         height: '75vh', 
//         overflow:'scroll' 
//     },
//     control: {
//       padding: theme.spacing(2),
//     },
//   }));

  export default function ChatScreen() {
    const history = useHistory();
    // const classes = useStyles();

    const [projectsChat, setProjectsChat] = useState([]);
    //const [projectSelected, setProjectSelected] = useState({});
    const dispatch = useDispatch();
    const projectList = useSelector( (state) => state.projectsSearch);
    const { 
        projects, 
        loading, 
//        error 
    } = projectList;


    const selectProject = (project) => {
        
        //setProjectSelected(project);
        var ref = '/screams' + project._id;
        history.push(ref);  

    }
    
    useEffect(() => {
        if(loading === false){
            if(projects){
                // console.log(projects);
                setProjectsChat(projects);
            }else{
                dispatch(searchProjects(null,null, false));
            }   
        }else{
            dispatch(searchProjects(null,null, false));
        } 
    }, [dispatch, loading, projects]);

    return (   
    <Container fluid xs={12} >
        <Row>
            <Col>
                <Card >
                    <Card.Body>
                        <Typography variant="h5" align="center" > 
                            My Chats
                        </Typography>
                    </Card.Body>
                </Card>

            </Col>
        </Row>
        <Row>
            <Col>
                {/* <Card >
                    <Card.Body>
                        <Typography variant="h6" align="center" > 
                            Projects
                        </Typography>
                    </Card.Body>
                </Card> */}
                {/* <Typography variant="h5" align="center" className={classes.header}> 
                    Projects
                </Typography> */}
            </Col>
        </Row>
        { projectsChat.map((pro,l)=>{
            return ( 
            <Row key={l} xs={12} >
                <Col>
                <Button key={l} variant="outline-secondary" block onClick={()=>selectProject(pro)}>
                    {pro.name}
                </Button>
                </Col>
            </Row> )
        })}
    </Container>  
        
    );
}
