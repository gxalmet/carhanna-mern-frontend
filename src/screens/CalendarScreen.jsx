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
import 
{ 
//    useHistory 
} from 'react-router-dom';

import { searchProjects } from '../actions/projectActions';
import 
{ 
    getFirstDate, 
    getlastDate, 
    // convertDate, 
    buildCalendar, 
    buildHeaderCalendar 
} from '../utils/utils';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 
{ 
    // Form, 
    // Col, 
    Button, 
    Card, 
    // CardDeck, 
    // CardGroup 
} from 'react-bootstrap';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

//import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export default function CalendarScreen() {

    //const history = useHistory();

    const [projectsCalendar, setProjectsCalendar] = useState([]);
    const [header, setHeader] = useState([]);

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

                setProjectsCalendar(buildCalendar(firstDate, lastDate, projects));
                setHeader(buildHeaderCalendar(firstDate, lastDate));
            }else{
                dispatch(searchProjects(null,null, false));
            }   
        }else{
            dispatch(searchProjects(null,null, false));
        } 
    }, [dispatch, loading, projects]);

    
    
    return (
        <Grid 
            container 
            // spacing={3}   
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={12}>
                <Card >
                    <Card.Body>
                        <Typography variant="h5" align="center" > 
                            Calendar
                        </Typography>
                    </Card.Body>
                </Card>

                <TableContainer component={Paper} >
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                {header.map((head, h)=>{
                                    return ( 
                                    <TableCell size ="small" key={h} style={{border: '.2rem solid white', fontSize:'.7rem', color: 'black', backgroundColor: '#cccccc', lineHeight:'1rem'}}>
                                        <Typography variant="body2" align="center" > 
                            
                        
                                        { head.day.toLocaleString("en-GB", {
                                            weekday: 'short'})}
                                        </Typography>
                                    </TableCell>
                                    );
                                })}
                            </TableRow>
                            <TableRow>
                                {header.map((head, h)=>{
                                    return ( 
                                    <TableCell size ="small" key={h} style={{border: '.2rem solid white', fontSize:'.7rem', color: 'black', backgroundColor: '#cccccc', lineHeight:'1rem'}}>
                                        <Typography variant="body2" align="center" > 
                            
                        
                                        { head.day.toLocaleString("en-GB", {
                                            day: "numeric",
                                            month: "numeric",
                                            year: "numeric", })}
                                        </Typography>
                                    </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projectsCalendar.map((line,i)=>{
                                return (
                                <TableRow key={i} style={{border: '.2rem solid #cccccc'}}>
                                    {Object.entries(line).map((days,k)=>{
                                        if(Object.entries(days['1'].project).length > 0){
                                            if(days['1'].colspan){
                                                
                                                return ( 
                                                    <TableCell key={k} colSpan={days['1'].colspan} style={{border: '.2rem solid #cccccc'}}>
                                                        <Button variant="light" block >
                                                            {days['1'].project.name} 
                                                        </Button>
                                                    </TableCell>)
                                            }else{
                                            
                                                return ( <React.Fragment key={k} ></React.Fragment>)
                                            }
                                            
                                        }else{
                                            
                                            return ( <TableCell key={k} style={{border: '.2rem solid #cccccc'}}></TableCell>)
                                        }
                                    })}
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}


