import 
React, 
{ 
    useState, 
    useEffect 
} from 'react';
import 
{ 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { searchProjects } from '../actions/projectActions';
import { getFirstDate, getlastDate, buildAgenda, convertDate } from '../utils/utils';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form, Col, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import SvgIcon from '@material-ui/core/SvgIcon';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
//import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
export default function AgendaScreen() {
    const history = useHistory();
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [projectsTable, setProjectsTable] = useState([]);

    const dispatch = useDispatch();
    const projectList = useSelector( (state) => state.projectsSearch);
    const { 
        projects, 
        loading, 
    //    error 
    } = projectList;

    useEffect(() => {
        
        if(loading === false){
            if(projects){
                var firstDate = getFirstDate(projects);
                var lastDate = getlastDate(projects);
                setBeginDate(convertDate(firstDate));
                setEndDate(convertDate(lastDate));
                setProjectsTable(buildAgenda(firstDate, lastDate, projects));
            }else{
                dispatch(searchProjects(null,null, false));
            }   
        }else{
            dispatch(searchProjects(null,null, false));
        } 
    }, [dispatch, loading, projects]);


    

    const numbers = [0,1,2,3,4,5,6];

    function searchProjectsButton(e) {
        //e.preventDefault();
        setProjectsTable(buildAgenda(new Date(beginDate), new Date(endDate), projects));
    }

    const navigateToButton = id => e => {
        var ref = '/editproject' + id;
        history.push(ref);   
    }

    // function createProjectButton(e) {
    //     var url = '/createproject';
    //     history.push(url);   
    // }
    
    return (
        <Container fluid xs={12}>
            {/* <Grid item xs={12}> */}
                <Card >
                    <Card.Body>
                        <Typography variant="h5" align="center" > 
                            Agenda
                        </Typography>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Form className="form" >
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formBasicBegin">
                                        <Form.Label>Begin Date</Form.Label>
                                        <Form.Control type="date" defaultValue={beginDate} onChange={(e)=>setBeginDate(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicBegin">    
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control type="date" defaultValue={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                
                                <Button variant="light" block onClick={searchProjectsButton}>
                                    <SearchIcon/>
                                </Button>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
            {/* </Grid> */}
            <Grid item xs={12}>
            
                <Card>
                <Card.Body>
                <TableContainer component={Paper}>
                    <Table className="table-agenda" aria-label="collapsible table">
                        <TableHead className="table-head-agenda">
                            <TableRow className="table-row-agenda">
                                <TableCell className="table-cell-agenda" align="center">Sunday</TableCell>
                                <TableCell className="table-cell-agenda" align="center">Monday</TableCell>
                                <TableCell className="table-cell-agenda" align="center">Tuesday</TableCell>
                                <TableCell className="table-cell-agenda" align="center">Wednesday</TableCell>
                                <TableCell className="table-cell-agenda" align="center">Thursday</TableCell>
                                <TableCell className="table-cell-agenda" align="center">Friday</TableCell>
                                <TableCell className="table-cell-agenda" align="center">Saturday</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-body-agenda">
                        {projectsTable.map((pro,i)=>{
                            
                            return ( 
                            <TableRow key={i} className="table-row-agenda">
                                
                                {numbers.map((num,j)=>{
                                   return ( 
                                   <TableCell className="table-cell-agenda" key={j} style={{ verticalAlign: 'top' }}  padding="none" size="medium">
                                       
                                        <Card >
                                        <Card.Header style={{ textAlign: 'center' }}>
                                            {pro[num].day.toLocaleString("en-GB", {
                                            weekday: 'short',
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric", })}
                                        </Card.Header>
                                        <Card.Body>
                                        {pro[num].projects.map((project,k)=>{
                                            return (
                                            <Button key={k} variant="secondary" block onClick={navigateToButton(project._id)}>
                                                {project.name}
                                            </Button>
                                            )
                                        })}
                                        <Link to="/createproject" style={{textDecoration: 'none', color:'grey'}}>
                                            <AddCircleOutlineOutlinedIcon  ></AddCircleOutlineOutlinedIcon>
                                        </Link>
                                        </Card.Body>
                                        </Card>
                                   </TableCell> )
                                })}
                                
                            </TableRow>)
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Card.Body>
                </Card>
            </Grid>
        </Container>
    );
}


