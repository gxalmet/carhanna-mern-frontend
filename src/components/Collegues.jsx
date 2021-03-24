import React from 'react'
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

function Collegues(props) {
    const collegues = props.collegues;
    //const userId = props.userId;
    
    return (

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" >Name</TableCell>
                        <TableCell align="center" >Surname</TableCell>
                        <TableCell align="center" >E-mail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {collegues.map((col,i)=>{
                    return (
                    <TableRow key={i}>
                        <TableCell  align="center">{col.name}</TableCell>
                        <TableCell  align="center">{col.surname}</TableCell>
                        <TableCell  align="center">{col.email}</TableCell>
                    </TableRow> )
                })}
            </TableBody>
            </Table>

        </TableContainer>
    )
}

export default Collegues
