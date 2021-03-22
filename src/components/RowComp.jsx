import 
React, 
{ 
    useState, 
//    useEffect 
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
//import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
//import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
//import Box from '@material-ui/core/Box';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableHead from '@material-ui/core/TableHead';
import 
{ 
//  Form, 
  Button 
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { statusDescription } from  '../utils/utils.js';

import RowCollapse from './RowCollapse';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
});

export default function RowComp(props) {
    const history = useHistory();
    const { row } = props;
    
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    const navigateToPorject = (id) => {
      var ref = '/editproject' + row._id;
      history.push(ref);  
    };

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <Button variant="secondary" block onClick={navigateToPorject} >
            <Grid container spacing={3}>
                <Grid item xs={3}>{row.name}</Grid>
                <Grid item xs={3}>{new Date(row.begin_date).toLocaleString("en-GB", {
                  weekday: 'short',
                  day: "numeric",
                  month: "short",
                  year: "numeric", })}</Grid>
                <Grid item xs={3}>{new Date(row.end_date).toLocaleString("en-GB", {
                  weekday: 'short',
                  day: "numeric",
                  month: "short",
                  year: "numeric", })}</Grid>
                <Grid item xs={3}>{statusDescription(row.status)}</Grid>
              </Grid>
            </Button> 
          </TableCell>
          {/* <TableCell align="right">{new Date(row.begin_date).toLocaleString("en-GB", {
                                            weekday: 'short',
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric", })}</TableCell>
          <TableCell align="right">{new Date(row.end_date).toLocaleString("en-GB", {
                                            weekday: 'short',
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric", })}</TableCell>
          <TableCell align="right">{statusDescription(row.status)}</TableCell> */}
        </TableRow>
        { row.child && 
          row.child.length > 0 &&
          row.child.map((childRow) => ( <RowCollapse key={childRow._id} child ={childRow} openCol={open}/>))
        }
      </React.Fragment>

      
    );
  }

