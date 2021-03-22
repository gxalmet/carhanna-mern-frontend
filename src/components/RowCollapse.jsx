import 
React, 
{ 
//    useState, 
//    useEffect 
} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
//import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
//import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
//import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//import { Link } from 'react-router-dom';
//import { convertDate, statusDescription } from  '../utils/utils.js';
import RowComp from './RowComp';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
});

export default function RowCollapse (props) {

    //const [open, setOpen] = useState(false);
    const openCollapse = props.openCol;
    const classes = useRowStyles();
    var project = props.child;
// className={classes.root}
    return (
        <TableRow className={classes.root}>
            <TableCell style={{ paddingBottom: 0, paddingTop:0 }} colSpan={6}>
                <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                    <Box margin={0}>
                        <Table size="small" aria-label="purchases">
                            <TableBody>
                                <RowComp key={project._id} row={project} />
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};



