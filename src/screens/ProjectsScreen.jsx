import 
React, 
{ 
//    useState, 
    useEffect 
} from 'react';
import 
{ 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { searchProjects } from '../actions/projectActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import RowComp from '../components/RowComp';
import {  Card } from 'react-bootstrap';

// const useRowStyles = makeStyles({
//     root: {
//       '& > *': {
//         borderBottom: 'unset',
//       },
//     },
// });

export default function ProjectsScreen () {

    const dispatch = useDispatch();
    const projectList = useSelector( (state) => state.projectsSearch) || {};
    const { 
        projects, 
        // loading, 
        // error 
    } = projectList;

    useEffect(() => {
        dispatch(searchProjects(null,null, true));
    }, [dispatch]);


    
    return (
        <Grid 
            container 
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={12}>
                <Card >
                    <Card.Body>
                        <Typography variant="h5" align="center" > 
                            Projects list
                        </Typography>
                    </Card.Body>
                </Card>

                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Project Name</TableCell>
                                {/* <TableCell align="right">Begin Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Status</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { projects && projects.map((row) => (
                            <RowComp key={row._id} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

